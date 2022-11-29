const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)

cam.position.z = 5;

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// resizing handler

function onWindowResize() {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

//background color
scene.background = new THREE.Color("rgb(0, 205, 254)")
var num = 1
var materials = []
for (i = 1; i <= 6; i++) {
    materials.push(new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: new THREE.TextureLoader().load(`textures/die${i}.png`)
    }))
}
cube = new THREE.BoxGeometry(1, 1, 1);
dice = new THREE.Mesh(cube, materials);
scene.add(dice);
const width = 10;
const height = 10;
const intensity = 5;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(0, 3, 1);
rectLight.lookAt(scene.position);
scene.add(rectLight)


function animate() {
    requestAnimationFrame(animate);
    dice.rotation.x += .01;
    dice.rotation.y += .01;
    renderer.render(scene, cam);
}
animate()