"""Numerical examples rendered in the deck and companion handouts."""

from math import cos, exp, hypot, pi, radians, sin, sqrt
from html import escape


def fmt(value):
    return f"{round(value, 3):g}".replace("-", "−")


def axis(points, limits):
    """Number-line markers with fixed positions across all example states."""
    low, high = limits

    def pos(value):
        return 65 + (value - low) / (high - low) * 590

    labels = "".join(
        f'<circle cx="{pos(value)}" cy="{y}" r="8" class="dot-{color}"/>'
        f'<text x="{pos(value)}" y="{y + (-17 if y < 75 else 29)}">{escape(label)}</text>'
        for value, label, color, y in points
    )
    return ('<svg class="example-plot" viewBox="0 0 720 140" aria-hidden="true">'
            '<line class="plot-axis" x1="45" x2="675" y1="75" y2="75"/>'
            f'{labels}</svg>')


def density_plot(separation, weight, observation=None):
    centers = [-separation / 2, separation / 2]
    weights = [weight, 1 - weight]

    def contribution(x, k):
        return weights[k] * exp(-((x - centers[k]) ** 2) / 2) / sqrt(2 * pi)

    def x_pixel(x):
        return 55 + (x + 6) / 12 * 620

    paths = []
    for k in range(3):
        points = []
        for i in range(121):
            x = -6 + i / 10
            y = contribution(x, k) if k < 2 else sum(contribution(x, j) for j in (0, 1))
            points.append(f"{x_pixel(x):.1f},{220 - 455 * y:.1f}")
        paths.append(f'<polyline class="curve-{k}" points="{" ".join(points)}"/>')
    if observation is not None:
        x = x_pixel(observation)
        paths.append(f'<line class="guide" x1="{x}" x2="{x}" y1="25" y2="220"/>')
        for k in (0, 1):
            y = 220 - 455 * contribution(observation, k)
            paths.append(f'<circle class="dot-{k}" cx="{x}" cy="{y}" r="5"/>')
        paths.append(f'<text x="{x}" y="253">x = {fmt(observation)}</text>')
    return ('<svg class="example-plot" viewBox="0 0 720 265" aria-hidden="true">'
            '<line class="plot-axis" x1="55" x2="675" y1="220" y2="220"/>'
            + "".join(paths) + '</svg>')


def tree(height):
    def y(value):
        return 220 - value * 24
    return f'''<svg class="example-plot" viewBox="0 0 720 270" aria-hidden="true">
    <path class="curve-2" d="M110 220V172H240V220 M430 220V124H560V220 M175 172V52H495V124"/>
    <line class="guide" x1="45" x2="670" y1="{y(height)}" y2="{y(height)}"/>
    <text x="110" y="253">A</text><text x="240" y="253">B</text>
    <text x="430" y="253">C</text><text x="560" y="253">D</text>
    <text x="690" y="{y(height)+6}">{height}</text></svg>'''


def projection_plot(angle):
    u, v = cos(radians(angle)), sin(radians(angle))
    score = 3 * u + v
    px, py = 340 + 49 * score * u, 150 - 49 * score * v
    arrow_length = min(185, 121 / max(abs(v), .01))
    tx, ty = 340 + arrow_length * u, 150 - arrow_length * v
    arrow = (f'{tx},{ty} {tx-15*u-6*v},{ty+15*v-6*u} '
             f'{tx-15*u+6*v},{ty+15*v+6*u}')
    return f'''<svg class="example-plot" viewBox="0 0 720 300" aria-hidden="true">
    <path class="plot-axis" d="M55 150H665 M340 25V275"/>
    <line class="curve-2" x1="{340-119*u}" y1="{150+119*v}" x2="{tx}" y2="{ty}"/>
    <polygon class="dot-2" points="{arrow}"/>
    <line class="guide" x1="487" y1="101" x2="{px}" y2="{py}"/>
    <circle class="dot-0" cx="487" cy="101" r="8"/><text x="531" y="88">(3, 1)</text>
    <circle class="dot-1" cx="{px}" cy="{py}" r="8"/>
    <text x="650" y="176">X₁</text><text x="367" y="40">X₂</text></svg>'''


def standardization_plot(kind):
    # Same density family before and after shifting and scaling its variable.
    params = {"Gaussian": (1.5, 1.25), "Right-skewed": (2, sqrt(2)), "Two peaks": (0, sqrt(4.64))}
    mu, sigma = params[kind]

    def gaussian(x, loc, scale):
        return exp(-.5 * ((x-loc)/scale)**2) / (sqrt(2*pi)*scale)

    def density(x):
        if kind == "Gaussian":
            return gaussian(x, mu, sigma)
        if kind == "Right-skewed":
            return x*exp(-x) if x >= 0 else 0
        return (gaussian(x, -2, .8) + gaussian(x, 2, .8))/2

    def curve(left, low, high, transformed):
        points = []
        for i in range(121):
            x = low + (high-low)*i/120
            y = sigma * density(mu + sigma*x) if transformed else density(x)
            points.append(f'{left+2.6*i:.1f},{190-270*y:.1f}')
        return " ".join(points)

    return f'''<svg class="example-plot" viewBox="0 0 720 235" aria-hidden="true">
    <path class="plot-axis" d="M25 190H337 M380 190H692"/>
    <polyline class="curve-0" points="{curve(25, -5, 10, False)}"/>
    <polyline class="curve-2" points="{curve(380, -5, 6, True)}"/>
    <text x="181" y="221">Original feature</text><text x="536" y="221">Standardized feature</text></svg>'''


def states(label, values, fn):
    return label, [(str(value), *fn(value)) for value in values]


def mean(center):
    distances = [(x - center) ** 2 for x in (0, 2, 4)]
    return (f'J = {" + ".join(map(fmt, distances))} = {fmt(sum(distances))}',
            'The centroid is at the mean.' if center == 2 else 'Try moving the centroid closer to the mean at 2.',
            axis([(x, str(x), 0, 91) for x in (0, 2, 4)] + [(center, 'Centroid', 1, 57)], (0, 4)))


def assignment(x):
    a, b = (x - 1) ** 2, (x - 5) ** 2
    return (f'J contribution = {min(a,b)}', f'Distances squared: {a} and {b}. Membership is ({int(a<=b)}, {int(b<a)}).',
            axis([(1, 'Centroid 1', 0, 90), (5, 'Centroid 2', 0, 90), (x, f'x = {x}', 1, 55)], (0, 6)))


def mixture(case):
    separation, weight = {
        "Close · equal weights": (1, .5), "Far apart · equal weights": (5, .5),
        "Far apart · unequal weights": (5, .8), "Close · unequal weights": (1, .8),
    }[case]
    return (f'Priors: {fmt(weight)} and {fmt(1-weight)}',
            'Blue and orange show the weighted component densities. Green is the mixture.',
            density_plot(separation, weight))


def posterior(case):
    x, w = {"At −1 · equal priors": (-1, .5), "At 0 · equal priors": (0, .5),
            "At 0 · component 1 more common": (0, .8), "At 1 · component 1 more common": (1, .8)}[case]
    a = w * exp(-((x + 1)**2) / 2) / sqrt(2*pi)
    b = (1-w) * exp(-((x - 1)**2) / 2) / sqrt(2*pi)
    return (f'Membership: {a/(a+b):.1%} and {b/(a+b):.1%}',
            f'At the dashed line, the blue and orange contributions are {a:.4f} and {b:.4f}. '
            f'Divide each by their sum, {a+b:.4f}, shown in green.',
            density_plot(2, w, x))


def weighted(w):
    count = .9 + .5 + w
    mu = (2 * .5 + 4 * w) / count
    variance = (.9 * mu**2 + .5 * (2-mu)**2 + w * (4-mu)**2) / count
    return (f'Mean {fmt(mu)} · variance {fmt(variance)} · weight {fmt(count/3)}',
            f'Effective count = 0.9 + 0.5 + {fmt(w)} = {fmt(count)}. Each row’s remaining membership goes to the other component.',
            axis([(0, '0 · weight 0.9', 0, 93), (2, '2 · weight 0.5', 0, 93),
                  (4, f'4 · weight {fmt(w)}', 0, 93), (mu, 'Updated mean', 1, 56)], (0, 4)))


def linkage(case):
    method, shift = case
    x, y = 5 + shift, 9 + shift
    distances = [abs(a-b) for a in (0,2) for b in (x,y)]
    value = {"Complete": max(distances), "Single": min(distances), "Average": sum(distances)/4,
             "Centroid": abs(1 - (x+y)/2)}[method]
    return (f'{method} linkage = {fmt(value)}',
            f'Cross-group distances: {", ".join(map(fmt, distances))}. Group means: 1 and {fmt((x+y)/2)}.',
            axis([(0,'A₁',0,92),(2,'A₂',0,92),(x,'B₁',1,56),(y,'B₂',1,56)], (-1,9)))


def result(headline, detail):
    return headline, detail, ""


def cut(height, partitions):
    merged = sum(height >= level for level in (2, 4, 7))
    groups = 4 - merged
    return (f'{groups} {"group" if groups == 1 else "groups"}',
            partitions[merged], tree(height))


PROOF = [
    ("Start from the sample variance", r"s_{u_1}=\frac1{n-1}\sum_{i=1}^n(u_1^\top x_i-u_1^\top\bar x)^2",
     "Each scalar score is compared with the mean score."),
    ("Write the square as a product", r"s_{u_1}=\frac1{n-1}\sum_{i=1}^n(u_1^\top x_i-u_1^\top\bar x)(u_1^\top x_i-u_1^\top\bar x)",
     "The two factors are the same scalar. One copy can be transposed without changing its value."),
    ("Group the centered vectors", r"s_{u_1}=\frac1{n-1}\sum_{i=1}^n u_1^\top(x_i-\bar x)(x_i-\bar x)^\top u_1",
     "The centered vector and its transpose form an outer product."),
    ("Factor out the direction", r"s_{u_1}=u_1^\top\left(\frac1{n-1}\sum_{i=1}^n(x_i-\bar x)(x_i-\bar x)^\top\right)u_1",
     "The direction is constant across observations, so it moves outside the sum."),
    ("Recognize the covariance matrix", r"s_{u_1}=u_1^\top S u_1",
     "The expression in parentheses is the sample covariance matrix S."),
]


def examples():
    groups = ["{A}  {B}  {C}  {D}", "{A,B}  {C}  {D}", "{A,B}  {C,D}", "{A,B,C,D}"]
    cases = {}
    cases["assignment"] = states("Observation x", range(7), assignment)
    cases["mean"] = states("Trial centroid", [i/4 for i in range(17)], mean)
    cases["density"] = states("Component configuration",
                              ["Close · equal weights", "Far apart · equal weights", "Far apart · unequal weights",
                               "Close · unequal weights"], mixture)
    cases["posterior"] = states("Observation and prior",
                                 ["At −1 · equal priors", "At 0 · equal priors", "At 0 · component 1 more common",
                                  "At 1 · component 1 more common"], posterior)
    cases["weighted"] = states("Membership of the point at 4", [.1,.3,.5,.7,.9], weighted)
    cases["alternation"] = ("Algorithm step", [
        ("Hard E-step analogue", *result("Point → one membership flag equal to 1", "K-means uses the closest centroid as its single assignment.")),
        ("Soft E-step", *result("Point → a probability for each component", "The Gaussian mixture uses its current parameters to obtain each posterior.")),
        ("Hard update", *result("Update each centroid using only its own points", "Ordinary means use membership flags as 0 or 1 weights.")),
        ("Soft M-step", *result("Update each component using its fractional counts", "Means, covariances and priors all use the same posteriors."))])
    cases["first-merge"] = states("Compare a pair", [(0,2),(0,5),(0,9),(2,5),(2,9),(5,9)],
            lambda ab: (f'|{ab[1]} − {ab[0]}| = {ab[1]-ab[0]}',
                        'This is the closest pair.' if ab==(0,2) else 'There is a shorter pair in this dataset.',
                        axis([(x,str(x),1 if x in ab else 0,91) for x in (0,2,5,9)], (0,9))))
    cases["merge-count"] = states("Merges completed", [0,1,2,3],
            lambda i: (f'{4-i} {"cluster remains" if i == 3 else "clusters remain"}',
                       groups[i],tree([0,2,4,7][i])))
    cases["cut"] = states("Cut height", range(9), lambda height: cut(height, groups))
    cases["linkage"] = ("Rule and position of group B", [
        (f"{method} · {'shifted left' if shift else 'starting position'}", *linkage((method,shift)))
        for shift in (0,-6) for method in ("Complete","Single","Average","Centroid")])
    cases["next-merge"] = ("Linkage rule", [
        (name, *result(f'Distance from {{0,2}} to 5 is {distance}',
                       'The distance from 5 to 9 is 4. ' + interpretation))
        for name, distance, interpretation in (
            ("Single",3,"Join {0,2} and 5 next."),
            ("Complete",5,"Join 5 and 9 next."),
            ("Average",4,"Two candidate merges tie at distance 4."),
            ("Centroid",4,"Two candidate merges tie at distance 4."))])
    cases["projection"] = states("Angle in degrees", range(-90,91,15),
        lambda angle: (f'Score = {fmt(3*cos(radians(angle))+sin(radians(angle)))}',
                       'The orange point is the projection. The dashed segment meets the candidate axis at a right angle.',
                       projection_plot(angle)))
    cases["unit"] = ("Direction and length", [(f"{direction} · length {c}", *result(
        f'Projected variance = {c}² × {base} = {c*c*base}',
        f'The unit direction along {direction} has variance {base}.'))
        for direction, base in (("X₁",9),("X₂",1)) for c in (1,2,3)])
    cases["compression"] = states("Components to keep", [1,2,3],lambda d: result(
        f'{sum([9,3,1][:d])/13:.1%} of total variance retained',
        f'Original row (6, 2, 1), mean (2, 1, 0). Reconstruction {tuple([6,2,1][:d]+[2,1,0][d:])}.'))
    cases["neighbor-scale"] = states("Multiplier on feature 1", [.01,.05,.1,.5,1],lambda c: result(
        f'Distance to A: {fmt(hypot(8*c,1))} · distance to B: {fmt(hypot(c,3))}',
        f'Query (0,0), A (8,1), B (1,3). Neighbor {"A" if hypot(8*c,1)<hypot(c,3) else "B"} is closer.'))
    cases["minmax"] = states("Observation x", range(5,36,5),lambda x: (
        f'({x} − 10) ÷ (30 − 10) = {fmt((x-10)/20)}', 'The lower and upper fitted endpoints map to 0 and 1.',
        axis([(0,'Fitted min',0,91),(1,'Fitted max',0,91),((x-10)/20,'Transformed x',1,56)], (-.3,1.3))))
    cases["outlier"] = states("Fitted maximum", [30,40,60,110],lambda x: (
        f'Value 20 maps to {fmt(10/(x-10))}', f'Value 15 maps to {fmt(5/(x-10))}. The new range is {x-10}.',
        axis([(0,'0',0,102),(1,'1',0,102),(5/(x-10),'Raw 15',1,59),(10/(x-10),'Raw 20',0,90)], (0,1))))
    cases["standardize"] = states("Observation x", range(20,81,5),lambda x: (
        f'({x} − 50) ÷ 10 = {fmt((x-50)/10)}', 'A one-unit move on the new axis is ten original units.',
        axis([(0,'Mean',0,92),((x-50)/10,'Standardized x',1,56)], (-3,3))))
    cases["shape"] = ("Example feature", [(name, title, detail, standardization_plot(name)) for name,title,detail in (
        ("Gaussian", "A bell curve remains a bell curve", "With population parameters it is centered at 0 with standard deviation 1."),
        ("Right-skewed", "The long right tail stays on the right", "Subtracting the mean and dividing by a positive number preserves the order of every value."),
        ("Two peaks", "Two peaks remain two peaks", "Standardization moves the peaks and changes their scale while preserving the overall shape."))])
    cases["whiten"] = states("Pair of PCA scores", [(6,2),(-3,1),(0,-2),(3,0)],lambda z: result(
        f'Whitened scores: ({fmt(z[0]/3)}, {fmt(z[1])})',
        f'First: {z[0]} ÷ √9 = {fmt(z[0]/3)}. Second: {z[1]} ÷ √1 = {fmt(z[1])}.'))
    cases["small-eigenvalue"] = states("Component eigenvalue", [4,1,.25,.01,0],lambda v: result(
        f'Whitening multiplier: {fmt(1/sqrt(v))}' if v else 'Whitening multiplier is undefined',
        f'A score of 0.2 becomes {fmt(.2/sqrt(v))}.' if v else 'A zero-variance direction has no scale to divide by.'))
    cases["choose-transform"] = ("Situation", [
        ("Image intensities need consistent bounds", *result("Try min–max normalization", "With known bounds 0 and 255, divide by 255 to express intensities on a 0–1 scale.")),
        ("The original features have different spreads", *result("Try standardization", "Give each original feature unit spread while keeping its original direction.")),
        ("Principal coordinates should have zero covariance and unit spread", *result("Try PCA whitening", "Rotate into the principal component basis and divide by its standard deviations."))])
    return cases
