var scene;
var geom;
var material;
var renderer;
var sphereMesh = null
var controls;
var camera;

var thisWidth = 600;
var thisHeight = 500;



function rhino_logo_build(){}

  var sphere = null;

  var Module = {
    onRuntimeInitialized: function() {

      // run some code because rhino3dm.js is loaded.
      console.log("rhino3dm loaded");

      // authenticate
      RhinoCompute.authToken = RhinoCompute.getAuthToken();

      // create a sphere with rhino3dm
      sphere = new Module.Sphere([0,0,0], 10);

      // use Rhino.Compute to create a mesh from this sphere
      // the call returns a promise, thus we must wait until
      // the result comes back
       RhinoCompute.Mesh.createFromSphere(sphere, 10, 10)
       .then(function(value) {
         sphereMesh = Module.CommonObject.decode(value);
      //
      //   // visualize this with three.js
      console.log("about to visualize()");
         visualize();
       });
    }
  }//end modual

  function visualize () {
    // set up threejs scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(1,1,1);

    // set up threejs camera
    camera = new THREE.PerspectiveCamera( 75, thisWidth/thisHeight, 0.1, 1000 );
    camera.position.x = 20;
    camera.position.y = 0;
    camera.position.z = 20;


    // set up threejs renderer
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( thisWidth, thisHeight );
    //document.body.appendChild( renderer.domElement );
    var glcanvas = document.getElementById( 'glcanvas' );
    glcanvas.appendChild( renderer.domElement );

    // orbit controls help with mouse/trackpad interaction
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 500;





    // set up a material
    material = new THREE.MeshStandardMaterial({wireframe:true});

    let mesh = meshToThreejs(sphereMesh, material);
    scene.add(mesh);

    // render the scene
    renderer.render( scene, camera );
    animate();
  }// end visualize
//} //end logo build  - > runs on load;

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}



function load_api_geom(){
    // convert rhino3dm mesh to threejs mesh
    let mydata = retrunedgeometry.items[0].data
    let decodedata= JSON.parse(mydata)
    console.log(decodedata);
    console.log(decodedata.data);
    de_serialized_mesh = Module.CommonObject.decode(decodedata.data);
    var this_mesh = meshToThreejs(de_serialized_mesh, material);
    scene.add(this_mesh);
}


// conversion method rhino3dm mesh to threejs mesh
function meshToThreejs(mesh, material) {
  var geometry = new THREE.BufferGeometry();
  var vertices = mesh.vertices();
  var vertexbuffer = new Float32Array(3 * vertices.count);
  for( var i=0; i<vertices.count; i++) {
    pt = vertices.get(i);
    vertexbuffer[i*3] = pt[0];
    vertexbuffer[i*3+1] = pt[1];
    vertexbuffer[i*3+2] = pt[2];
  }
  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.addAttribute( 'position', new THREE.BufferAttribute( vertexbuffer, 3 ) );

  indices = [];
  var faces = mesh.faces();
  for( var i=0; i<faces.count; i++) {
    face = faces.get(i);
    indices.push(face[0], face[1], face[2]);
    if( face[2] != face[3] ) {
      indices.push(face[2], face[3], face[0]);
    }
  }
  geometry.setIndex(indices);

  var normals = mesh.normals();
  var normalBuffer = new Float32Array(3*normals.count);
  for( var i=0; i<normals.count; i++) {
    pt = normals.get(i);
    normalBuffer[i*3] = pt[0];
    normalBuffer[i*3+1] = pt[1];
    normalBuffer[i*3+2] = pt[1];
  }
  geometry.addAttribute( 'normal', new THREE.BufferAttribute( normalBuffer, 3 ) );
  return new THREE.Mesh( geometry, material );
}
