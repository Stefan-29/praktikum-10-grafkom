//Creating Scene and Camera
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

// INIT CAMERA
cam.position.z = 20;
cam.position.x = 0;
cam.position.y = 10;
cam.lookAt(-10, -20, -50)
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

const controls = new THREE.OrbitControls(cam, renderer.domElement);
controls.update();

//Background
scene.background = new THREE.Color("rgb(0, 205, 254)")



//Light
const ambient = new THREE.AmbientLight(0x404040, 10);
ambient.color = new THREE.Color(1, 1, 1);
ambient.intensity = 0.5;
scene.add(ambient);

//Grass Floor
//Geometry&UVMapping
let floorPlane = new THREE.BufferGeometry();
let vertices = new Float32Array([-10, 0, 0,
    10, 0, 0,
    10, 0, 10, -10, 0, 10
])


let uvs = new Float32Array([0, 0,
    1, 0,
    1, 1,
    0, 1
])

floorPlane.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
floorPlane.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    //Setting Index
floorPlane.setIndex([
    0, 2, 1,
    2, 0, 3
])


//Material
const textureLoader = new THREE.TextureLoader();
let grassBaseFile = textureLoader.load("./textures/grass_texture.jpeg")
let grassMaterial = new THREE.MeshBasicMaterial({ color: 0x0a7d15, map: grassBaseFile, side: THREE.DoubleSide });
//Mesh
let grassMesh = new THREE.Mesh(floorPlane, grassMaterial)
scene.add(grassMesh)
console.log(grassMesh)

//BrickWall
let brickWall = new THREE.BufferGeometry();
let vertices1 = new Float32Array([
    //Front
    -6, 0, 2.5, -1, 0, 2.5, -1, 4, 2.5, -6, 4, 2.5,

    1, 0, 2.5,
    6, 0, 2.5,
    6, 4, 2.5,
    1, 4, 2.5,

    //Back
    -6, 0, 7.5, -1, 0, 7.5, -1, 4, 7.5, -6, 4, 7.5,

    1, 0, 7.5,
    6, 0, 7.5,
    6, 4, 7.5,
    1, 4, 7.5,

    //Sides
    -6, 0, 2.5, -6, 0, 7.5, -6, 4, 7.5, -6, 4, 2.5,

    6, 0, 2.5,
    6, 0, 7.5,
    6, 4, 7.5,
    6, 4, 2.5

])

let uvs1 = new Float32Array([0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1
])

brickWall.setAttribute('position', new THREE.BufferAttribute(vertices1, 3))
brickWall.setAttribute('uv', new THREE.BufferAttribute(uvs1, 2))
    //Setting Index
brickWall.setIndex([
    0, 2, 1,
    2, 0, 3,

    4, 6, 5,
    6, 4, 7,

    8, 10, 9,
    10, 8, 11,

    12, 14, 13,
    14, 12, 15,

    16, 18, 17,
    18, 16, 19,

    20, 22, 21,
    22, 20, 23
])


//Material
const brickWallbasecolor = textureLoader.load("./textures/Brick_Wall_017_basecolor.jpg");
const brickWallnormalMap = textureLoader.load("./textures/Brick_Wall_017_normal.jpg");
const brickWallheightMap = textureLoader.load("./textures/Brick_Wall_017_height.png");
const brickWallroughnessMap = textureLoader.load("./textures/Brick_Wall_017_roughness.jpg");
const brickWallambientOcclusionMap = textureLoader.load("./textures/Brick_Wall_017_ambientOcclusion.jpg");
let brickWallMaterial = new THREE.MeshStandardMaterial({
    map: brickWallbasecolor,
    normalMap: brickWallnormalMap,
    displacementMap: brickWallheightMap,
    displacementScale: 0.01,
    roughnessMap: brickWallroughnessMap,
    roughness: 0.25,
    aoMap: brickWallambientOcclusionMap,
    side: THREE.DoubleSide
});


//Mesh
let brickWallMesh = new THREE.Mesh(brickWall, brickWallMaterial)
scene.add(brickWallMesh)
console.log(brickWallMesh)


//Metal Roof
let metalRoof = new THREE.BufferGeometry()
let vertices2 = new Float32Array([
    //front
    -6, 4, 2.5, -1, 4, 2.5, -6, 5, 2.5,
    0, 6, 2.5,

    6, 4, 2.5,
    1, 4, 2.5,
    6, 5, 2.5,
    0, 6, 2.5,

    //Back
    -
    6, 4, 7.5, -
    1, 4, 7.5, -6, 5, 7.5,
    0, 6, 7.5,

    6, 4, 7.5,
    1, 4, 7.5,
    6, 5, 7.5,
    0, 6, 7.5,

    //Side Base Roof

    -6, 4, 2.5, -6, 5, 2.5, -6, 4, 7.5, -6, 5, 7.5,
    6, 4, 2.5, 6, 5, 2.5, 6, 4, 7.5, 6, 5, 7.5,

    //Diagonal Plane
    0, 6, 2.5,
    0, 6, 7.5, -6, 5, 2.5, -6, 5, 7.5,

    0, 6, 2.5,
    0, 6, 7.5,
    6, 5, 2.5,
    6, 5, 7.5
])
let uvs2 = new Float32Array([0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,

    0, 0,
    1, 0,
    1, 1,
    0, 1,
])

metalRoof.setAttribute('position', new THREE.BufferAttribute(vertices2, 3))
metalRoof.setAttribute('uv', new THREE.BufferAttribute(uvs2, 2))
    //Setting Index
metalRoof.setIndex([
    3, 0, 1,
    0, 3, 2,

    7, 4, 5,
    4, 7, 6,

    11, 8, 9,
    8, 11, 10,

    15, 12, 13,
    12, 15, 14,

    19, 16, 18,
    16, 19, 17,

    23, 20, 22,
    20, 23, 21,

    26, 25, 24,
    25, 26, 27,

    30, 29, 28,
    29, 30, 31
])
const metalTileBaseMapFile = textureLoader.load("./textures/Metal_Tiles_003_basecolor.jpg")
let metalRoofMaterial = new THREE.MeshBasicMaterial({ map: metalTileBaseMapFile, side: THREE.DoubleSide });


//Mesh
let metalRoofMesh = new THREE.Mesh(metalRoof, metalRoofMaterial)
scene.add(metalRoofMesh)
console.log(metalRoofMesh)




function animate() {
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
    controls.update()
}
animate();