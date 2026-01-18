# Auralization Interactive Web App

An interactive educational web application for exploring acoustics, sound propagation, and auralization concepts. Built with Next.js, this app provides hands-on tools and visualizations to understand fundamental principles of audio engineering and spatial sound.

## Live Demo

🚀 [View the deployed application](https://auralization-adsp.vercel.app)

## Features

- **Decibel Calculator**: Interactive tool for understanding sound levels and decibel calculations
- **Directivity Explorer**: Visualize and explore sound source directivity patterns
- **Frequency Band Explorer**: Analyze different frequency ranges and their acoustic properties
- **Head Tracking Demo**: Experience binaural audio with head movement simulation
- **Localization Explorer**: Interactive exploration of sound localization principles
- **Masking Explorer**: Understand auditory masking effects
- **Noise Map Explorer**: Visualize noise distribution in environments
- **Plane Wave Visualizer**: 3D visualization of plane wave propagation
- **Pure Tone Explorer**: Generate and analyze pure tone signals
- **RT60 Explorer**: Room acoustics reverberation time analysis
- **Spatial Perception Explorer**: Interactive spatial audio perception tools
- **Spectrum Visualizer**: Real-time frequency spectrum analysis
- **Time Domain Visualizer**: Waveform visualization and analysis
- **Time-Frequency Explorer**: Combined time and frequency domain analysis
- **3D Explorers**: Beamforming, room acoustics, and wave propagation in 3D space
- **Educational Content**: Structured learning modules with quizzes and interactive examples

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js for interactive visualizations
- **Audio Processing**: Web Audio API
- **Content**: MDX for rich educational content
- **State Management**: Zustand for theme and application state

## Installation

1. Clone the repository:
   ```bash
   git clone https://gitlab.tu-ilmenau.de/cm586qy/auralization.git
   cd auralization
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

Navigate through the different sections using the menu:
- **Explore**: Interactive tools and visualizations
- **Learn**: Educational content organized by chapters
- **Python**: Python-based demonstrations and examples

Each explorer provides interactive controls to manipulate parameters and observe real-time changes in visualizations and audio output.

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── 3d/             # 3D visualization components
│   └── ...             # Interactive explorers
├── content/            # MDX educational content
├── lib/                # Utility functions and data
├── public/             # Static assets
└── stores/             # State management
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Development Workflow

To contribute to this project:

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://gitlab.tu-ilmenau.de/cm586qy/auralization.git
   cd auralization
   ```

2. **Pull the latest changes**:
   ```bash
   git pull origin main
   ```

3. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. **Push your branch** to GitLab:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Merge Request (Pull Request)**:
   - Go to the GitLab repository at https://gitlab.tu-ilmenau.de/cm586qy/auralization.
   - Navigate to Merge Requests.
   - Click "New merge request".
   - Select your branch as source and `main` as target.
   - Add a title, description, and submit.

Ensure you have the necessary permissions to push and create merge requests. If you encounter issues, contact the repository maintainer.

## Acknowledgments

Built for educational purposes to demonstrate acoustics and auralization concepts through interactive web technologies.
