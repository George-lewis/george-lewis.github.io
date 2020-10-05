---
layout: styled-md
styling: github
---

<script>
    (function () {
        if (window.innerWidth < 720) {
            alert("Sorry, your screen may not be wide enough to display all the math.")
        }
    })()
</script>

<!-- MatJax settings -->
<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  chtml: {
      scale: 1.25
  }
};
</script>

<!-- MathJax dependency -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

# Trigonometric Identities

## Reciprocal Identities

$\sin (u) = \frac 1 {\csc(u)} \ \cos (u) = \frac 1 {\sec (u)} \ \tan (u) = \frac 1 {\cot (u)}$

$\csc (u) = \frac 1 {\sin (u)} \ \sec (u) = \frac 1 {\cos (u)} \ \cot (u) = \frac 1 {\tan (u)}$

## Pythagorean Identities

$\sin^2 (u) + \cos^2 (u) = 1$

$1 + \tan^2 (u) = \sec^2 (u)$

$1 + \cot^2 (u) = \csc^2 (u)$

## Quotient Identities

$\tan (u) = \frac {\sin (u)} {\cos (u)} \ \cot (u) = \frac {\cos (u)} {\sin (u)}$

## Co-Function Identities

$\sin \left(\frac \pi 2 - u\right) = \cos (u) \ \cos \left(\frac \pi 2 - u\right) = \sin (u) \ \tan \left(\frac \pi 2 - u\right) = \cot (u)$

$\csc \left(\frac \pi 2 - u\right) = \sec (u) \ \sec \left(\frac \pi 2 - u\right) = \csc (u) \ \cot \left(\frac \pi 2 - u\right) = \tan (u)$

## Even-Odd Identities

$\sin(-x) = -\sin(x) \ \cos(-x) = -\cos(x) \ \tan(-x) = -\tan(x)$

$\csc(-x) = -\csc(x) \ \sec(-x) = -\sec(x) \ \cot(-x) = -\cot(x)$

## Sum-Difference Formulas

$\sin(u \pm v) = \sin(u) \cos(v) \pm \cos(u) \sin(v)$

$\cos(u \pm v) = \cos(u) \cos(v) \mp \sin(u) \sin(v)$

$\tan(u \pm v) = \frac {\tan(u) \pm \tan(v)} {1 \mp \tan(u) \tan(v)}$

## Double Angle Formulas

$\sin(2u) = 2 \sin(u) \cos(u)$

$\cos(2u) = \cos^2(u) - \sin^2(u)$

$\tan^2(u) = \frac {1 - \cos(2u)} {1 + \cos(2u)}$

## Sum-to-Product Formulas

$\sin(u) + \sin(v) = 2 \sin\left(\frac {u + v} {2}\right) \cos\left(\frac {u - v} {2}\right)$

$\sin(u) - \sin(v) = 2 \cos\left(\frac {u + v} {2}\right) \sin\left(\frac {u - v} {2}\right)$

$\cos(u) + \cos(v) = 2 \cos\left(\frac {u + v} {2}\right) \cos\left(\frac {u - v} {2}\right)$

$\cos(u) - \cos(v) = -2 \sin\left(\frac {u + v} {2}\right) \sin\left(\frac {u - v} {2}\right)$

## Product-to-Sum Formulas

$\sin(u) \sin(v) = \frac 1 2 \left[ \cos(u - v) - \cos(u + v) \right]$

$\cos(u) \cos(v) = \frac 1 2 \left[ \cos(u - v) + \cos(u + v) \right]$

$\sin(u) \cos(v) = \frac 1 2 \left[ \sin(u + v) + \sin(u - v) \right]$

$\cos(u) \sin(v) = \frac 1 2 \left[ \sin(u + v) - \sin(u - v) \right]$

**Notice**: All information sourced from [SoS Math](http://www.sosmath.com/trig/Trig5/trig5/trig5.html)