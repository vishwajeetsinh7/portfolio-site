const canvas = document.querySelector('canvas.webgl')

// curson position
const cursor = {
    x:0,
    y:0
}



// swindos size creat 
const sizes = {
    width: window.innerWidth,   
    height: window.innerHeight
}



// scene 
const scene  = new THREE.Scene()


// object
const geometry = new THREE.TorusGeometry(1,.3,30,9)
const material = new THREE.MeshBasicMaterial()


material.color = new THREE.Color(0xffff00)


const cube = new THREE.Mesh(geometry, material)

scene.add(cube)




// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


//renderes

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

let time = Date.now()

// clock second method for accurate rotation
const clock = new THREE.Clock()


// usE  G S A P

    // gsap.to(cube.position, {duration:1, delay:1, x:1})
    // gsap.to(cube.position, {duration:1 , delay:2, x:0})


const tick = () => 

{

    let one = 1
    let two = 2

    const elaspedTime = clock.getElapsedTime()


    // time 
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    console.log(deltaTime)

    cube.rotation.y = elaspedTime * Math.PI * .20
    cube.rotation.z = elaspedTime * Math.PI * .20

    
    
    window.addEventListener('mousemove', event => 
    {
        cursor.x = event.clientX / sizes.width - 0.5, 
        cursor.y = event.clientY / sizes.height - 0.5
    })
    
    // update camera

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * -5
    camera.lookAt(cube.position)
    
    // cube.position.y = cursor.y * 3


    renderer.render(scene, camera)

    console.log('tick')
    window.requestAnimationFrame(tick)


}
tick()