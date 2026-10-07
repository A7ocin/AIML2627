"""Update History Part 2 questions in the existing Wooclap event.

Chrome must already be running with remote debugging on port 9222 and an
authenticated Wooclap session. The script edits existing forms in place, so
question URLs and event settings are preserved.
"""

from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import Page, sync_playwright


HERE = Path(__file__).resolve().parents[1]
EVENT_URL = "https://app.wooclap.com/events/GMSPICB/live-session"

# The replacement reflection (question 8) is the URL used by the History 2
# slides. The original question 7 is also synchronized with the source bank.
LIVE_FORMS = [
    ("L00-C04", 4),
    ("L00-C05", 5),
    ("L00-C06", 6),
    ("L00-C07", 7),
    ("L00-C08", 8),
    ("L00-O02", 10),
]

LIVE_REFLECTION = {
    "id": "L00-C08",
    "type": "MCQ",
    "stem": "Which sequence best captures a recurring pattern in the history of AI?",
    "choices": [
        "A strong result on one benchmark proves general intelligence, so funding then rises without interruption.",
        "More computing power eventually removes the need for algorithms, data and careful evaluation.",
        "A narrow success inspires broad claims; exposed limits reduce confidence; later progress combines new methods and resources.",
        "An AI winter means research stops completely until the same system is rediscovered unchanged.",
    ],
    "correct_index": 3,
}


def open_editor(page: Page, question_number: int):
    button = page.locator(
        f'button[aria-label^="Edit Question {question_number} -"]'
    )
    if button.count() != 1:
        raise RuntimeError(
            f"Expected one edit button for question {question_number}, "
            f"found {button.count()}"
        )
    # Wooclap's draggable question list can intercept Playwright's normal
    # pointer action. A DOM click invokes the same React handler reliably.
    button.evaluate("element => element.click()")
    dialog = page.get_by_role("dialog")
    dialog.wait_for(state="visible")
    return dialog


def update_form(page: Page, source: dict, question_number: int) -> None:
    dialog = open_editor(page, question_number)
    title = f"{source['id']} · {source['stem']}"
    prompts = dialog.locator("textarea")
    if prompts.count() != 1:
        raise RuntimeError(
            f"Question {question_number}: expected one prompt field, "
            f"found {prompts.count()}"
        )
    prompts.fill(title)

    choice_inputs = dialog.locator('input[type="text"]')
    answer_boxes = dialog.locator('input[aria-label^="Checkbox: Choice"]')
    if source["type"] == "MCQ":
        while choice_inputs.count() < len(source["choices"]):
            dialog.get_by_role("button", name="New choice", exact=True).click()
        choice_inputs = dialog.locator('input[type="text"]')
        answer_boxes = dialog.locator('input[aria-label^="Checkbox: Choice"]')
        if choice_inputs.count() != 4 or answer_boxes.count() != 4:
            raise RuntimeError(
                f"Question {question_number}: expected four choices and four "
                f"answer boxes, found {choice_inputs.count()} and "
                f"{answer_boxes.count()}"
            )
        for index, choice in enumerate(source["choices"]):
            choice_inputs.nth(index).fill(choice)
        correct = source["correct_index"] - 1
        for index in range(4):
            box = answer_boxes.nth(index)
            desired = index == correct
            if box.is_checked() != desired:
                box.click()
    else:
        # Wooclap open questions expose optional "correct answer" text fields.
        # Keep them blank so the reflection remains ungraded.
        if answer_boxes.count():
            raise RuntimeError(
                f"Question {question_number}: the live form is not an open question"
            )
        for index in range(choice_inputs.count()):
            choice_inputs.nth(index).fill("")

    dialog.get_by_role("button", name="Save", exact=True).click()
    dialog.wait_for(state="hidden")
    page.locator(
        f'button[aria-label^="Edit Question {question_number} -"]'
    ).wait_for(state="visible")

    expected_prefix = title[:80]
    saved_label = page.locator(
        f'button[aria-label^="Edit Question {question_number} -"]'
    ).get_attribute("aria-label")
    if expected_prefix not in saved_label:
        raise RuntimeError(
            f"Question {question_number}: saved title did not match: {saved_label}"
        )
    print(f"updated question {question_number}: {source['id']}")


def verify_form(page: Page, source: dict, question_number: int) -> None:
    dialog = open_editor(page, question_number)
    expected_title = f"{source['id']} · {source['stem']}"
    actual_title = dialog.locator("textarea").input_value()
    if actual_title != expected_title:
        raise RuntimeError(
            f"Question {question_number}: prompt mismatch after reload"
        )

    choice_inputs = dialog.locator('input[type="text"]')
    answer_boxes = dialog.locator('input[aria-label^="Checkbox: Choice"]')
    if source["type"] == "MCQ":
        actual_choices = [
            choice_inputs.nth(index).input_value()
            for index in range(choice_inputs.count())
        ]
        actual_correct = [
            index + 1
            for index in range(answer_boxes.count())
            if answer_boxes.nth(index).is_checked()
        ]
        if actual_choices != source["choices"]:
            raise RuntimeError(
                f"Question {question_number}: choices mismatch after reload"
            )
        if actual_correct != [source["correct_index"]]:
            raise RuntimeError(
                f"Question {question_number}: answer key mismatch after reload"
            )
    else:
        if answer_boxes.count() or any(
            choice_inputs.nth(index).input_value()
            for index in range(choice_inputs.count())
        ):
            raise RuntimeError(
                f"Question {question_number}: open response is unexpectedly graded"
            )

    dialog.get_by_role("button", name="Cancel", exact=True).click()
    dialog.wait_for(state="hidden")
    print(f"verified question {question_number}: {source['id']}")


def main() -> None:
    bank = json.loads((HERE / "question-bank.json").read_text(encoding="utf-8"))
    questions = {question["id"]: question for question in bank["questions"]}
    questions[LIVE_REFLECTION["id"]] = LIVE_REFLECTION

    with sync_playwright() as playwright:
        browser = playwright.chromium.connect_over_cdp("http://127.0.0.1:9222")
        context = browser.contexts[0]
        page = context.pages[0]
        page.goto(EVENT_URL, wait_until="domcontentloaded")
        page.get_by_role("button", name="New question", exact=True).wait_for()

        for source_id, question_number in LIVE_FORMS:
            update_form(page, questions[source_id], question_number)

        for source_id, question_number in LIVE_FORMS:
            verify_form(page, questions[source_id], question_number)

        browser.close()


if __name__ == "__main__":
    main()
