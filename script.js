document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
});

// --- Navbar Scrolled State ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('[data-reveal]');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => {
    revealObserver.observe(el);
    
    // Support transition delays
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.transitionDelay = `${delay}ms`;
});

// --- Initialize Vanilla Tilt ---
if(typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// --- GitHub API Auto Project Fetching ---
async function fetchGitHubProjects() {
    const container = document.getElementById('github-repos-container');
    if(!container) return;

    try {
        const username = 'ram12321276';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        
        if(repos.length === 0) {
            container.innerHTML = '<p class="text-center w-100">No public repositories available yet.</p>';
            return;
        }

        container.innerHTML = ''; // Clear loading text

        repos.forEach((repo, index) => {
            // Ignore forks or purely empty repos if preferred
            const delay = index * 100;
            const description = repo.description || "Open source project focusing on robust software development and algorithms.";
            const language = repo.language || "Code";
            
            const cardHTML = `
                <div class="bento-card" data-reveal="up" data-reveal-delay="${delay}" data-tilt>
                    <i class="fab fa-github card-icon"></i>
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p class="mb-2" style="font-size: 0.9rem;">${description}</p>
                    <div style="margin-top: auto; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; color:var(--accent-emerald); font-weight:600;"><i class="fas fa-circle" style="font-size:0.6rem; margin-right:4px;"></i>${language}</span>
                        <a href="${repo.html_url}" target="_blank" class="card-link" style="color:var(--text-secondary);">Repo <i class="fas fa-arrow-right" style="font-size:0.8em; margin-left:4px;"></i></a>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Re-init observer and tilt for new DOM elements
        const newElements = container.querySelectorAll('[data-reveal]');
        newElements.forEach(el => {
            el.style.transitionDelay = `${el.getAttribute('data-reveal-delay')}ms`;
            revealObserver.observe(el);
            setTimeout(() => el.classList.add('revealed'), 100);
        });
        
        if(typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(container.querySelectorAll("[data-tilt]"), {
                max: 5, speed: 400, glare: true, "max-glare": 0.2,
            });
        }

    } catch (error) {
        console.warn("GitHub API rate limit exceeded or fetch failed. Loading fallback projects.", error);
        
        // Graceful static fallback
        const fallbackRepos = [
            {
                name: "rambabu-portfolio",
                description: "Personal portfolio website built with HTML, CSS, JS, and 3D animations.",
                language: "HTML",
                html_url: "https://github.com/ram12321276/rambabu-portfolio"
            },
            {
                name: "student-performance-system",
                description: "C/C++ architecture to manage student records, attendance, and marks.",
                language: "C++",
                html_url: "https://github.com/ram12321276"
            },
            {
                name: "mobile-usage-analysis",
                description: "Python data pipeline processing records via Pandas/NumPy.",
                language: "Python",
                html_url: "https://github.com/ram12321276"
            }
        ];

        container.innerHTML = '';
        fallbackRepos.forEach((repo, index) => {
            const delay = index * 100;
            const cardHTML = `
                <div class="bento-card" data-reveal="up" data-reveal-delay="${delay}" data-tilt>
                    <i class="fab fa-github card-icon"></i>
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p class="mb-2" style="font-size: 0.9rem;">${repo.description}</p>
                    <div style="margin-top: auto; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; color:var(--accent-emerald); font-weight:600;"><i class="fas fa-circle" style="font-size:0.6rem; margin-right:4px;"></i>${repo.language}</span>
                        <a href="${repo.html_url}" target="_blank" class="card-link" style="color:var(--text-secondary);">Repo <i class="fas fa-arrow-right" style="font-size:0.8em; margin-left:4px;"></i></a>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Re-init observer and tilt for the fallback cards
        const newElements = container.querySelectorAll('[data-reveal]');
        newElements.forEach(el => {
            el.style.transitionDelay = `${el.getAttribute('data-reveal-delay')}ms`;
            if (typeof revealObserver !== 'undefined') revealObserver.observe(el);
            setTimeout(() => el.classList.add('revealed'), 100);
        });
        
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(container.querySelectorAll("[data-tilt]"), {
                max: 5, speed: 400, glare: true, "max-glare": 0.2,
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchGitHubProjects);

// --- Three.js 3D Hero Animation ---
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if(!container || typeof THREE === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Adjust camera positioning to place the object distinctively
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = 2; // Offset to the right

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create a smooth abstract object (TorusKnot)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32);
    
    // Create a wireframe material mixed with a base material for a "tech/hologram" feel
    const material = new THREE.MeshStandardMaterial({
        color: 0x10b981, // Emerald base
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add a second mesh slightly larger for an inner glow effect
    const solidMaterial = new THREE.MeshStandardMaterial({
        color: 0x0070f3, // Stripe blue inner core
        roughness: 0.2,
        metalness: 0.8
    });
    
    const coreGeometry = new THREE.IcosahedronGeometry(1.1, 1);
    const coreMesh = new THREE.Mesh(coreGeometry, solidMaterial);
    scene.add(coreMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const blueLight = new THREE.PointLight(0x0070f3, 2);
    blueLight.position.set(-5, 0, 0);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(0x10b981, 2);
    greenLight.position.set(5, -5, 0);
    scene.add(greenLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.001;
        mouseY = (event.clientY - windowHalfY) * 0.001;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        // Smoothly rotate object based on mouse
        mesh.rotation.y += 0.05 * (targetX - mesh.rotation.y);
        mesh.rotation.x += 0.05 * (targetY - mesh.rotation.x);
        
        // Constant slow rotation
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.005;

        coreMesh.rotation.x -= 0.003;
        coreMesh.rotation.y -= 0.002;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive Canvas
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

document.addEventListener('DOMContentLoaded', initThreeJS);

// --- Custom Cursor Logic (Bubbles/Snowflakes) ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Simple trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
        
        createFlake(posX, posY);
    });

    // Particle/Snowflake generation
    let lastFlakeTime = 0;
    function createFlake(x, y) {
        if (Date.now() - lastFlakeTime < 60) return; // Limit spawn rate
        lastFlakeTime = Date.now();
        
        const flake = document.createElement('div');
        flake.className = 'cursor-flake';
        flake.style.left = `${x}px`;
        flake.style.top = `${y}px`;
        
        // Horizontal drift effect
        const drift = (Math.random() - 0.5) * 80;
        flake.style.setProperty('--drift', `${drift}px`);
        
        // Random size
        const size = Math.random() * 6 + 2;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        
        // Glow effect
        const isEmerald = Math.random() > 0.5;
        flake.style.backgroundColor = isEmerald ? 'var(--accent-emerald)' : 'var(--accent-blue)';
        let shadowColor = isEmerald ? 'rgba(16, 185, 129, 0.6)' : 'rgba(0, 112, 243, 0.6)';
        flake.style.boxShadow = `0 0 10px ${shadowColor}`;
        
        document.body.appendChild(flake);
        
        // Cleanup after dropping
        setTimeout(() => {
            flake.remove();
        }, 1200);
    }

    // Hover interactions (simple scale/glow)
    const interactiveElements = document.querySelectorAll('a, button, .btn, .social-pill, .bento-card, .stripe-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.transform = "translate(-50%, -50%) scale(0)";
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });
}
