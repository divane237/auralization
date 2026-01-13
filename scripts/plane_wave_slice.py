#!/usr/bin/env python3
"""Generate and plot a 1D plane-wave pressure slice using numpy and matplotlib."""

from __future__ import annotations

import argparse
from textwrap import dedent

import numpy as np
import matplotlib.pyplot as plt


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Draw a snapshot of a 1D plane wave traveling along +x."
    )
    parser.set_defaults()
    parser.add_argument("--c", type=float, default=343.0, help="Speed of sound in m/s")
    parser.add_argument("--f", type=float, default=200.0, help="Frequency in Hz")
    parser.add_argument("--amplitude", type=float, default=1.0, help="Pressure amplitude")
    parser.add_argument("--t", type=float, default=0.001, help="Time instant in seconds")
    parser.add_argument("--distance", type=float, default=2.0, help="Length of the x-axis in meters")
    parser.add_argument("--samples", type=int, default=1000, help="Number of sampling points along x")
    parser.add_argument("--show", action="store_true", help="Show the plot interactively instead of just saving")
    parser.add_argument("--output", type=str, help="Path to save the figure (PNG, PDF, etc.)")
    return parser


def compute_pressure(
    *,
    c: float,
    f: float,
    amplitude: float,
    t: float,
    distance: float,
    samples: int,
) -> tuple[np.ndarray, np.ndarray]:
    omega = 2 * np.pi * f
    wavelength = c / f
    k = 2 * np.pi / wavelength

    x = np.linspace(0, distance, samples)
    p = amplitude * np.cos(k * x - omega * t)
    return x, p


def plot_slice(
    x: np.ndarray,
    p: np.ndarray,
    *,
    c: float,
    f: float,
    t: float,
    show: bool,
    output: str | None,
) -> None:
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.plot(x, p, label="Plane wave slice")
    ax.set_xlabel("x (m)")
    ax.set_ylabel("Pressure p'(x, t)")
    ax.set_title("1D Plane Wave Slice")
    ax.grid(True, linestyle="--", alpha=0.5)
    ax.legend()
    annotation = dedent(
        f"""
        c = {c:.1f} m/s  •  f = {f:.1f} Hz  •  t = {t:.3e} s
        """
    )
    ax.text(0.01, 0.95, annotation, transform=ax.transAxes, fontsize=9, va="top")

    if output:
        fig.tight_layout()
        fig.savefig(output, dpi=150)
        print(f"Saved plane-wave slice to '{output}'.")
    if show or (output is None):
        plt.show()


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    x, p = compute_pressure(
        c=args.c,
        f=args.f,
        amplitude=args.amplitude,
        t=args.t,
        distance=args.distance,
        samples=args.samples,
    )

    plot_slice(
        x,
        p,
        c=args.c,
        f=args.f,
        t=args.t,
        show=args.show,
        output=args.output,
    )


if __name__ == "__main__":
    main()
