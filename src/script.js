import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x000000 );



// Axes helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture =  textureLoader.load('/textures/matcaps/2.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace


/**
 * Fonts
 */
const fontloader = new FontLoader()

fontloader.load(
    'fonts/Terminal Grotesque_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            '    418.Studio \n Waiting Room',{
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments:19,
                // bevelEnabled: true,
                // bevelThickness: 0.03,
                // bevelSize:0.03,
                // bevelOffset:0,
                // bevelSegments:19
            }
        )
        textGeometry.computeBoundingBox()
        textGeometry.center()

        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry,material)
        scene.add(text)

        const donutGeometry = new THREE.BoxGeometry( 1, 1, 1 )

        for(let i = 0; i<=1500; i++){
            const donut = new THREE.Mesh(donutGeometry,material)

            donut.position.x = (Math.random() - 0.5) * 35
            donut.position.y = (Math.random() - 0.5) * 35
            donut.position.z = (Math.random() - 0.5) * 35


            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random() * Math.PI / 7
            donut.scale.set(scale,scale,scale)

            scene.add(donut)
        }
    }
)

const fontloader2 = new FontLoader()

fontloader2.load(
    'fonts/Terminal Grotesque_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Bientôt',{
                font: font,
                size: 15,
                height: 0.2,
                curveSegments:19,
                // bevelEnabled: true,
                // bevelThickness: 0.03,
                // bevelSize:0.03,
                // bevelOffset:0,
                // bevelSegments:19
            }
        )
        textGeometry.computeBoundingBox()
        textGeometry.center()

        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry,material)
        text.position.y = 30
        scene.add(text)

    }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 4
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.3
controls.cursor

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()