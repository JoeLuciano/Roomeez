var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene()
{
    var scene = new BABYLON.Scene(engine);

    var universalCamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 2, new BABYLON.Vector3(0, 0, 0), scene);
    universalCamera.speed = 0.1;
    universalCamera.fov = 1.2;
    universalCamera.minZ = 0.01;
    universalCamera.setTarget(BABYLON.Vector3.Zero());
    universalCamera.position = new BABYLON.Vector3(0, 0, 2);
    universalCamera.rotation = new BABYLON.Vector3(0, -3.15, 0);
    scene.activeCamera = universalCamera;
    scene.activeCamera.attachControl(canvas);
    universalCamera.setPosition(new BABYLON.Vector3(0, 1.2, 2.5));

    // Place hemispherical light (no shadows)
    var hemiLight = new BABYLON.HemisphericLight("hemiLight",
        new BABYLON.Vector3(0, 1, 0),
        scene);

    // Place point light (shadows)
    var light = new BABYLON.PointLight("pointlight",
        new BABYLON.Vector3(-5, 10, 20),
        scene);
    light.specular = new BABYLON.Color3(1, 1, 0);
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    universalCamera.attachControl(canvas, true);

    // do something with the meshes and skeletons
    // particleSystems are always null for glTF assets

    return scene;
}

function buildRoom(width, height, depth, scene) {
    var widthDelta = width / 2;
    var heightDelta = height / 2;
    var depthDelta = depth / 2;

    // Place a ceiling
    var ceiling = new BABYLON.MeshBuilder.CreatePlane("cl",
        {
            width: width,
            height: depth,
            subdivisions: 1,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);
    ceiling.setAbsolutePosition(new BABYLON.Vector3(0, height, 0));
    ceiling.rotation = new BABYLON.Vector3(Math.PI/2, 0, 0);
    ceiling.receiveShadows = true;

    // Place a floor
    var ground = new BABYLON.MeshBuilder.CreateGround("gd",
        {
            width: width,
            height: depth,
            subdivisions: 1
        },
        scene);
    ground.receiveShadows = true;

    // Place a back drop
    var backWall = BABYLON.MeshBuilder.CreatePlane("backwall", {
        width: width,
        height: height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    backWall.setAbsolutePosition(new BABYLON.Vector3(0, heightDelta, -1 * depthDelta));
    backWall.receiveShadows = true;

    // Place the right wall
    var wall = BABYLON.MeshBuilder.CreatePlane("wall", {
        width: depth,
        height: height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    wall.setAbsolutePosition(new BABYLON.Vector3(-1 * widthDelta, heightDelta, 0));
    wall.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wall.receiveShadows = true;

    // Place the left wall
    var wall2 = BABYLON.MeshBuilder.CreatePlane("wall2", {
        width: depth,
        height: height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    wall2.setAbsolutePosition(new BABYLON.Vector3(widthDelta, heightDelta, 0));
    wall2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wall2.receiveShadows = true;

//Attach Texture to Ground
    var scale=4.0;

    /*
    var lhCOLOR = "assets\\Light_Hardwood\\Wood_Floor_006_COLOR.jpg";
    var lhOCC = "assets\\Light_Hardwood\\Wood_Floor_006_OCC.jpg";
    var lhNORM = "assets\\Light_Hardwood\\Wood_Floor_006_NORM.jpg";
    var lhROUGH =   "assets\\Light_Hardwood\\Wood_Floor_006_ROUGH.jpg";
    var mat0 = new BABYLON.StandardMaterial(ground, scene);
    mat0.diffuseTexture = new BABYLON.Texture(lhCOLOR, scene);
    mat0.diffuseTexture.uScale = scale;
    mat0.diffuseTexture.vScale = scale;
    mat0.ambientTexture = new BABYLON.Texture(lhOCC, scene);
    mat0.ambientTexture.uScale = scale;
    mat0.ambientTexture.vScale = scale;
    mat0.bumpTexture = new BABYLON.Texture(lhNORM, scene);
    mat0.bumpTexture.uScale = scale;
    mat0.bumpTexture.vScale = scale;
    mat0.metallicRoughnessTexture = new BABYLON.Texture(lhROUGH, scene);
    mat0.metallicRoughnessTexture.uScale = scale;
    mat0.metallicRoughnessTexture.vScale = scale;
    mat0.specularPower = 400.0;
    ground.material = mat0;*/

//Attach Texture to Walls

    /*var mat1 = new BABYLON.StandardMaterial(backWall, scene);
    mat1.diffuseTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_COLOR.jpg", scene);
    mat1.diffuseTexture.uScale = scale;
    mat1.diffuseTexture.vScale = scale;
    mat1.bumpTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_NRM.jpg", scene);
    mat1.bumpTexture.uScale = scale;
    mat1.bumpTexture.vScale = scale;
    mat1.ambientTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_OCC.jpg", scene);
    mat1.ambientTexture.uScale = scale;
    mat1.ambientTexture.vScale = scale;
    mat1.specularTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_SPEC.jpg", scene);
    mat1.specularTexture = scale;
    mat1.specularTexture = scale;*/

    /*var mat1 = new BABYLON.StandardMaterial(backWall, scene);
    mat1.diffuseTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_COLOR.jpg", scene);
    mat1.diffuseTexture.uScale = scale;
    mat1.diffuseTexture.vScale = scale;
    mat1.bumpTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_NORM.jpg", scene);
    mat1.bumpTexture.uScale = scale;
    mat1.bumpTexture.vScale = scale;
    mat1.ambientTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_OCC.jpg", scene);
    mat1.ambientTexture.uScale = scale;
    mat1.ambientTexture.vScale = scale;
    mat1.metallicRoughnessTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_ROUGH.jpg", scene);
    mat1.metallicRoughnessTexture = scale;
    mat1.metallicRoughnessTexture = scale;
    mat1.specularPower = 100000.0;*/

    var mat1 = new BABYLON.StandardMaterial(backWall, scene);
    mat1.diffuseTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_COLOR.jpg", scene);
    mat1.diffuseTexture.uScale = scale;
    mat1.diffuseTexture.vScale = scale;
    mat1.bumpTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_NORM.jpg", scene);
    mat1.bumpTexture.uScale = scale;
    mat1.bumpTexture.vScale = scale;
    mat1.ambientTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_OCC.jpg", scene);
    mat1.ambientTexture.uScale = scale;
    mat1.ambientTexture.vScale = scale;
    mat1.metallicRoughnessTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_ROUGH.jpg", scene);
    mat1.metallicRoughnessTexture = scale;
    mat1.metallicRoughnessTexture = scale;
    mat1.specularPower = 400.0;

    ceiling.material = mat1;



    var dhCOLOR="assets\\Dark_Hardwood\\Wood_Floor_007_COLOR.jpg";
    var dhNORM = "assets\\Dark_Hardwood\\Wood_Floor_007_OCC.jpg";
    var dhOCC = "assets\\Dark_Hardwood\\Wood_Floor_007_NORM.jpg";
    var dhROUGH = "assets\\Dark_Hardwood\\Wood_Floor_007_ROUGH.jpg";

    var mat0 = new BABYLON.StandardMaterial(ground, scene);
    mat0.diffuseTexture = new BABYLON.Texture(dhCOLOR, scene);
    mat0.diffuseTexture.uScale = scale;
    mat0.diffuseTexture.vScale = scale;
    mat0.ambientTexture = new BABYLON.Texture(dhNORM, scene);
    mat0.ambientTexture.uScale = scale;
    mat0.ambientTexture.vScale = scale;
    mat0.bumpTexture = new BABYLON.Texture(dhOCC, scene);
    mat0.bumpTexture.uScale = scale;
    mat0.bumpTexture.vScale = scale;
    mat0.metallicRoughnessTexture = new BABYLON.Texture(dhROUGH, scene);
    mat0.metallicRoughnessTexture.uScale = scale;
    mat0.metallicRoughnessTexture.vScale = scale;
    mat0.specularPower = 400.0;
    ground.material = mat0;

    var cCOLOR="assets\\Concrete\\Concrete_011_COLOR.jpg";
    var cNORM = "assets\\Concrete\\Concrete_011_NORM.jpg";
    var cOCC = "assets\\Concrete\\Concrete_011_OCC.jpg";
    var cROUGH = "assets\\Concrete\\Concrete_011_ROUGH.jpg";

    var mat3 = new BABYLON.StandardMaterial(backWall, scene);
    mat3.diffuseTexture = new BABYLON.Texture(cCOLOR, scene);
    mat3.diffuseTexture.uScale = scale;
    mat3.diffuseTexture.vScale = scale;
    mat3.bumpTexture = new BABYLON.Texture(cNORM, scene);
    mat3.bumpTexture.uScale = scale;
    mat3.bumpTexture.vScale = scale;
    mat3.ambientTexture = new BABYLON.Texture(cOCC, scene);
    mat3.ambientTexture.uScale = scale;
    mat3.ambientTexture.vScale = scale;
    mat3.metallicRoughnessTexture = new BABYLON.Texture(cROUGH, scene);
    mat3.metallicRoughnessTexture = scale;
    mat3.metallicRoughnessTexture = scale;
    mat3.specularPower = 400.0;
    wall.material = mat3;
    wall2.material = mat3;

    var bwCOLOR="assets\\Brick_Wall\\Brick_Wall_011_COLOR.jpg";
    var bwNORM = "assets\\Brick_Wall\\Brick_Wall_011_NORM.jpg";
    var bwOCC = "assets\\Brick_Wall\\Brick_Wall_011_OCC.jpg";
    var bwROUGH = "assets\\Brick_Wall\\Brick_Wall_011_ROUGH.jpg";

    var mat2 = new BABYLON.StandardMaterial(backWall, scene);
    mat2.diffuseTexture = new BABYLON.Texture(bwCOLOR, scene);
    mat2.diffuseTexture.uScale = scale;
    mat2.diffuseTexture.vScale = scale;
    mat2.bumpTexture = new BABYLON.Texture(bwNORM, scene);
    mat2.bumpTexture.uScale = scale;
    mat2.bumpTexture.vScale = scale;
    mat2.ambientTexture = new BABYLON.Texture(bwOCC, scene);
    mat2.ambientTexture.uScale = scale;
    mat2.ambientTexture.vScale = scale;
    mat2.metallicRoughnessTexture = new BABYLON.Texture(bwROUGH, scene);
    mat2.metallicRoughnessTexture.uScale = scale;
    mat2.metallicRoughnessTexture.vScale = scale;
    mat2.specularPower = 10000.0;

    backWall.material = mat2;

}

function addPointLight(name, intensity, location, scene) {
    // Place point light (shadows)
    let light =  new BABYLON.PointLight(name, location, scene);
    light.intensity = intensity;
    light.specularColor = new BABYLON.Color3(1,1,0);
    light.diffuseColor = new BABYLON.Color3(1, 1, 0);
    return light;

}

var furnishings = []

function addFurnishing(model, location, scene)
{
    BABYLON.SceneLoader.ImportMesh(
        "", model,"",scene,
        function (meshes, particles, skeletons) {
            const mesh = meshes[0];
            mesh.setPosition(location);
            furnishings.push(mesh);
        });
    return furnishings[furnishings.length];
}

function removeFurnishing(mesh, scene) {
    var index = furnishings.indexOf(mesh);
    if (index == -1) return;

    mesh.getChildMeshes().forEach(function(mesh) {
        scene.removeMesh(mesh);
    });
    furnishings.splice(index, 1);
}


var scene = createScene();
var light = addPointLight("pointLight", .2, new BABYLON.Vector3(0, 2, 2), scene);
// Build 5 / 2.5 / 5 room
var room = buildRoom(5, 2.5, 5, scene);
var chair = addFurnishing("http://img.wfrcdn.com/docresources/37311/108/1089869.glb",
    new BABYLON.Vector3(0,0,0),
    scene);



engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});