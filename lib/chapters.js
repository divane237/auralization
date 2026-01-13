// lib/chapters.js
// Central registry describing each learning module and the MDX files that power it.

import Module01Intro from "@/content/01/01-intro.mdx";
import Module01WaveEquation from "@/content/01/01-wave-equation.mdx";
import Module01PlaneWaves from "@/content/01/01-plane-waves.mdx";
import Module01SignalsSpectra from "@/content/01/01-signals-spectra.mdx";
import Module01LevelsDecibels from "@/content/01/01-levels-decibels.mdx";
import Module02PointSources from "@/content/02/02-point-sources.mdx";
import Module02SourcePower from "@/content/02/02-source-power.mdx";
import Module02Directivity from "@/content/02/02-directivity.mdx";
import Module02Measurement from "@/content/02/02-measurement.mdx";
import Module03FreeField from "@/content/03/03-free-field.mdx";
import Module03Reflections from "@/content/03/03-reflections.mdx";
import Module03RoomModes from "@/content/03/03-room-modes.mdx";
import Module03Reverberation from "@/content/03/03-reverberation.mdx";
import Module03RoomImpulseResponse from "@/content/03/03-room-impulse-response.mdx";
import Module04HearingBasics from "@/content/04/04-hearing-basics.mdx";
import Module04LoudnessMasking from "@/content/04/04-loudness-masking.mdx";
import Module04Localization from "@/content/04/04-localization.mdx";
import Module04SpatialPerception from "@/content/04/04-spatial-perception.mdx";
import Module05DiscreteSignals from "@/content/05/05-discrete-signals.mdx";
import Module05Filters from "@/content/05/05-filters.mdx";
import Module05Convolution from "@/content/05/05-convolution-auralization.mdx";
import Module05BinauralHRTF from "@/content/05/05-binaural-hrtf.mdx";
import Module05RealtimeFilters from "@/content/05/05-real-time-filters.mdx";
import Module06StereoSurround from "@/content/06/06-stereo-vs-surround.mdx";
import Module06BinauralReproduction from "@/content/06/06-binaural-reproduction.mdx";
import Module06Interaction from "@/content/06/06-interaction.mdx";
import Module06SystemOverview from "@/content/06/06-system-overview.mdx";
import Module07Overview from "@/content/07/07-overview.mdx";
import Module07RoomsOutdoor from "@/content/07/07-rooms-vs-outdoor.mdx";
import Module07Applications from "@/content/07/07-applications.mdx";

const fundamentalsLessons = [
  {
    id: "01-intro",
    title: "Introduction to Sound",
    description: "Define sound physically and relate wave motion to pressure variations.",
    route: "01-intro",
    order: 1,
    mdx: Module01Intro,
  },
  {
    id: "01-wave-equation",
    title: "Acoustic Wave Equation",
    description: "Step through the relationships between pressure, density, and acceleration.",
    route: "01-wave-equation",
    order: 2,
    mdx: Module01WaveEquation,
  },
  {
    id: "01-plane-waves",
    title: "Plane Waves",
    description: "Explore simple traveling solutions and how they model real spaces.",
    route: "01-plane-waves",
    order: 3,
    mdx: Module01PlaneWaves,
  },
  {
    id: "01-signals-spectra",
    title: "Signals & Spectra",
    description: "Connect time-domain intuition to the spectral descriptions used in DSP.",
    route: "01-signals-spectra",
    order: 4,
    mdx: Module01SignalsSpectra,
  },
  {
    id: "01-levels-decibels",
    title: "Levels & Decibels",
    description: "Quantify amplitude, intensity, and reference levels used by acousticians.",
    route: "01-levels-decibels",
    order: 5,
    mdx: Module01LevelsDecibels,
  },
];

const sourcesLessons = [
  {
    id: "02-point-sources",
    title: "Point Sources & Spherical Waves",
    description: "Derive the monopole solution and understand spherical spreading losses.",
    route: "02-point-sources",
    order: 1,
    mdx: Module02PointSources,
  },
  {
    id: "02-source-power",
    title: "Sound Power & Source Ratings",
    description: "Translate energy flow into sound power levels used by manufacturers.",
    route: "02-source-power",
    order: 2,
    mdx: Module02SourcePower,
  },
  {
    id: "02-directivity",
    title: "Source Directivity & Directivity Index",
    description: "Interpret polar data and apply directivity factors to SPL predictions.",
    route: "02-directivity",
    order: 3,
    mdx: Module02Directivity,
  },
  {
    id: "02-measurement",
    title: "Measuring Sources & Directivity",
    description: "Survey common laboratory setups for characterizing source power and patterns.",
    route: "02-measurement",
    order: 4,
    mdx: Module02Measurement,
  },
];

const propagationLessons = [
  {
    id: "03-free-field",
    title: "Free-Field Propagation & Atmospheric Losses",
    description: "Model geometric spreading, ground effects, and air absorption for long-range prediction.",
    route: "03-free-field",
    order: 1,
    mdx: Module03FreeField,
  },
  {
    id: "03-reflections",
    title: "Early Reflections & Image Sources",
    description: "Apply absorption coefficients and mirror sources to generate first-order reflection data.",
    route: "03-reflections",
    order: 2,
    mdx: Module03Reflections,
  },
  {
    id: "03-room-modes",
    title: "Room Modes & Standing Waves",
    description: "Compute axial, tangential, and oblique modes plus placement strategies to manage them.",
    route: "03-room-modes",
    order: 3,
    mdx: Module03RoomModes,
  },
  {
    id: "03-reverberation",
    title: "Reverberation Time & Energy Decay",
    description: "Use Sabine/Eyring formulas to set T60 targets for different acoustic environments.",
    route: "03-reverberation",
    order: 4,
    mdx: Module03Reverberation,
  },
  {
    id: "03-room-impulse-response",
    title: "Room Impulse Responses & Auralization",
    description: "Capture or synthesize RIRs that combine direct sound, reflections, modes, and late reverb.",
    route: "03-room-impulse-response",
    order: 5,
    mdx: Module03RoomImpulseResponse,
  },
];

const psychoacousticsLessons = [
  {
    id: "04-hearing-basics",
    title: "Hearing Basics & Equal Loudness",
    description: "Review auditory anatomy, thresholds, and equal-loudness contours used in perception design.",
    route: "04-hearing-basics",
    order: 1,
    mdx: Module04HearingBasics,
  },
  {
    id: "04-loudness-masking",
    title: "Loudness & Masking Curves",
    description: "Translate loudness models and masking behaviors into auralization constraints.",
    route: "04-loudness-masking",
    order: 2,
    mdx: Module04LoudnessMasking,
  },
  {
    id: "04-localization",
    title: "Localization Cues: ITD, ILD, Spectral",
    description: "Explain binaural cues, Duplex Theory, and localization ambiguities.",
    route: "04-localization",
    order: 3,
    mdx: Module04Localization,
  },
  {
    id: "04-spatial-perception",
    title: "Spatial Perception & Externalization",
    description: "Link distance, DRR, and movement cues to externalization and perceived space.",
    route: "04-spatial-perception",
    order: 4,
    mdx: Module04SpatialPerception,
  },
];

const signalProcessingLessons = [
  {
    id: "05-discrete-signals",
    title: "Discrete Signals, Sampling & Aliasing",
    description: "Ground digital workflows using sampling theory and dynamic range calculus.",
    route: "05-discrete-signals",
    order: 1,
    mdx: Module05DiscreteSignals,
  },
  {
    id: "05-filters",
    title: "FIR/IIR Filters & Frequency Response",
    description: "Compare FIR and IIR structures for EQ, crossovers, and modal control.",
    route: "05-filters",
    order: 2,
    mdx: Module05Filters,
  },
  {
    id: "05-convolution-auralization",
    title: "Convolution for Auralization",
    description: "Balance time-domain and FFT-based convolution for long RIRs.",
    route: "05-convolution-auralization",
    order: 3,
    mdx: Module05Convolution,
  },
  {
    id: "05-binaural-hrtf",
    title: "HRTFs & Binaural Rendering",
    description: "Manage datasets, crosstalk, and convolution for binaural outputs.",
    route: "05-binaural-hrtf",
    order: 4,
    mdx: Module05BinauralHRTF,
  },
  {
    id: "05-real-time-filters",
    title: "Partitioned Convolution & RT Filters",
    description: "Implement efficient real-time filters under performance constraints.",
    route: "05-real-time-filters",
    order: 5,
    mdx: Module05RealtimeFilters,
  },
];

const virtualAcousticsLessons = [
  {
    id: "06-stereo-vs-surround",
    title: "Stereo, Surround & Ambisonics",
    description: "Survey playback formats and Ambisonic order trade-offs for immersive audio.",
    route: "06-stereo-vs-surround",
    order: 1,
    mdx: Module06StereoSurround,
  },
  {
    id: "06-binaural-reproduction",
    title: "Binaural Reproduction Methods",
    description: "Compare headphones vs loudspeakers plus crosstalk and binauralization details.",
    route: "06-binaural-reproduction",
    order: 2,
    mdx: Module06BinauralReproduction,
  },
  {
    id: "06-interaction",
    title: "Head Tracking & Dynamic Rendering",
    description: "Explain orientation updates, latency budgets, and motion-aware rendering.",
    route: "06-interaction",
    order: 3,
    mdx: Module06Interaction,
  },
  {
    id: "06-system-overview",
    title: "Acoustic VR System Pipeline",
    description: "Outline the data flows and interactive demos tying the pipeline together.",
    route: "06-system-overview",
    order: 4,
    mdx: Module06SystemOverview,
  },
];

const simulationLessons = [
  {
    id: "07-overview",
    title: "Simulation Methods Overview",
    description: "Compare image-source, ray tracing, and numerical solvers for accurate predictions.",
    route: "07-overview",
    order: 1,
    mdx: Module07Overview,
  },
  {
    id: "07-rooms-vs-outdoor",
    title: "Room, Outdoor & Structure-Borne Differences",
    description: "Highlight propagation distinctions and boundary handling per domain.",
    route: "07-rooms-vs-outdoor",
    order: 2,
    mdx: Module07RoomsOutdoor,
  },
  {
    id: "07-applications",
    title: "Simulation Applications",
    description: "Translate simulation outputs into noise control, building, and automotive use cases.",
    route: "07-applications",
    order: 3,
    mdx: Module07Applications,
  },
];

const rawChapters = [
  {
    id: "module-01",
    route: "01",
    title: "Module 01 · Fundamentals of Acoustics",
    description: "Core physics of sound waves plus the vocabulary you need for later DSP lessons.",
    subchapters: fundamentalsLessons,
  },
  {
    id: "module-02",
    route: "02",
    title: "Module 02 · Sound Sources & Directivity",
    description: "Model real-world emitters, compute sound power, and understand directional behavior.",
    subchapters: sourcesLessons,
  },
  {
    id: "module-03",
    route: "03",
    title: "Module 03 · Propagation & Rooms",
    description: "Propagate sound through air and rooms, predict reflections, and build full impulse responses.",
    subchapters: propagationLessons,
  },
  {
    id: "module-04",
    route: "04",
    title: "Module 04 · Psychoacoustics & Perception",
    description: "Ground spatial audio in human hearing and masking principles.",
    subchapters: psychoacousticsLessons,
  },
  {
    id: "module-05",
    route: "05",
    title: "Module 05 · Signal Processing for Auralization",
    description: "Build discrete-time filters, convolution, and binaural rendering primitives.",
    subchapters: signalProcessingLessons,
  },
  {
    id: "module-06",
    route: "06",
    title: "Module 06 · 3D Sound & Virtual Acoustics",
    description: "Connect playback formats, interaction, and system-level considerations for immersive scenes.",
    subchapters: virtualAcousticsLessons,
  },
  {
    id: "module-07",
    route: "07",
    title: "Module 07 · Simulation Methods (Advanced)",
    description: "Cover advanced simulation techniques, domain-specific challenges, and real-world applications.",
    subchapters: simulationLessons,
  },
];

export const chapters = rawChapters.map((chapter, index) => {
  const chapterRoute = chapter.route ?? `chapter${index + 1}`;

  return {
    ...chapter,
    route: chapterRoute,
    pythonExamples: chapter.pythonExamples ?? [],
    subchapters:
      chapter.subchapters?.map((subchapter, subIndex) => {
        const fallbackRoute =
          subchapter.route ?? subchapter.slug ?? subchapter.anchor ?? subchapter.id ?? `section-${subIndex + 1}`;
        const needsPrefixedSlug = subchapter.route == null && subchapter.fullRoute == null;
        const fullRoute = subchapter.fullRoute ?? (needsPrefixedSlug ? `${chapterRoute}-${fallbackRoute}` : fallbackRoute);

        return {
          ...subchapter,
          route: fallbackRoute,
          fullRoute,
        };
      }) ?? [],
  };
});
