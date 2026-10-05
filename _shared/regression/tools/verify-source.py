"""Recompute course statistics independently with NumPy/SciPy (optional developer tool)."""
from pathlib import Path
import json
import numpy as np
from scipy.stats import linregress, t

ROOT = Path(__file__).resolve().parents[1]
report = {}
for name in ['lr_scatter_mod', 'lr_maybe', 'lr_corcau', 'lr_underfitting', 'lr_scatter_polymods_with_test']:
    payload = json.loads((ROOT / f'data/{name}.json').read_text(encoding='utf-8'))
    train = next(trace for trace in payload['data'] if trace.get('name') == 'Train points')
    x, y = np.array(train['x']), np.array(train['y'])
    result = linregress(x, y)
    rss = np.sum((y - result.intercept - result.slope * x) ** 2)
    crit = t.ppf(.975, len(x) - 2)
    stats = {'n': len(x), 'intercept': result.intercept, 'slope': result.slope,
             'rss': float(rss), 'rse': float(np.sqrt(rss / (len(x) - 2))),
             'r2': result.rvalue ** 2, 'slopeSE': result.stderr,
             't': result.slope / result.stderr, 'df': len(x) - 2, 'p': result.pvalue,
             'slopeCI95': [result.slope - crit * result.stderr, result.slope + crit * result.stderr]}
    if name in ['lr_underfitting', 'lr_scatter_polymods_with_test']:
        test = next(trace for trace in payload['data'] if trace.get('name') == 'Test points')
        xt, yt = np.array(test['x']), np.array(test['y'])
        stats['independentPolynomialFits'] = []
        for degree in ([0, 1, 2] if name == 'lr_underfitting' else [1, 5, 15, 23]):
            model = np.polynomial.Legendre.fit(x, y, degree)
            residualSS = float(np.sum((y - model(x)) ** 2))
            stats['independentPolynomialFits'].append({'degree': degree,
                'basis': 'Legendre on scaled input',
                'trainR2': 1 - residualSS / float(np.sum((y - y.mean()) ** 2)),
                'trainRSE': float(np.sqrt(residualSS / (len(x) - degree - 1))),
                'testRMSE': float(np.sqrt(np.mean((yt - model(xt)) ** 2)))})
    report[name] = stats
(ROOT / 'notes/numerical-review.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print('Wrote independent source statistics to notes/numerical-review.json')
