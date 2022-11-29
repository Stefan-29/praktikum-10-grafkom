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
let tetrahedron = new THREE.TetrahedronGeometry(1, 0)
let material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('textures/bricks old.png')
})
const pyramid = new THREE.Mesh(tetrahedron, material)
pyramid.rotation.z = 45
pyramid.rotation.y = 45
pyramid.rotation.x = 45
scene.add(pyramid)

function animate() {
    requestAnimationFrame(animate);
    pyramid.rotation.x += .05;
    pyramid.rotation.y += .05;
    pyramid.rotation.z += .05;
    renderer.render(scene, cam);
}
animate()