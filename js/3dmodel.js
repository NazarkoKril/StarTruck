let scene, camera, renderer, model, mixer;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3, 0.3, 3.2);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('modelContainer').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(hemisphereLight);

    const loader = new THREE.GLTFLoader();
    loader.load(
        './3dmodel/scene.gltf',
        function (gltf) {
            console.log('Model loaded:', gltf);
            model = gltf.scene;

            model.traverse((child) => {
                if (child.isMesh) {
                    child.material.metalness = 0.7;
                    child.material.roughness = 0.3;
                    child.material.needsUpdate = true;
                }
            });

            scene.add(model);
            adjustModelScale(window.innerWidth);
            model.position.y -= 1.3;
            camera.lookAt(0, 0, 0);

            if (gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            }

            console.log('Model loaded successfully');
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    window.addEventListener('resize', onWindowResize, false);
}

function adjustModelScale(width) {
    const scaleFactor = width < 250 ? 0.2 : (width < 500 ? 0.4 : (width <= 820 ? 0.5 : (width <= 1024 ? 0.8 : 1))); // Визначити коефіцієнт масштабування
    if (model) {
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        model.scale.set((5 / maxDim) * scaleFactor, (5 / maxDim) * scaleFactor, (5 / maxDim) * scaleFactor); // Масштабувати модель

        if (width < 820) {
            model.position.y = -0.65;
        } else {
            model.position.y = -1.3;
        }
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    adjustModelScale(window.innerWidth);
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

init();
animate();
