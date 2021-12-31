const gridmat = {
  vertex:

`
/**
* Example Vertex Shader
* Sets the position of the vertex by setting gl_Position
*/

// Set the precision for data types used in this shader
precision highp float;
precision highp int;

// Default THREE.js uniforms available to both fragment and vertex shader
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

// Default uniforms provided by ShaderFrog.
uniform vec3 cameraPosition;
uniform float time;

// Default attributes provided by THREE.js. Attributes are only available in the
// vertex shader. You can pass them to the fragment shader using varyings
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv2;

// Examples of variables passed from vertex to fragment shader
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vUv2;

void main() {

    // To pass variables to the fragment shader, you assign them here in the
    // main function. Traditionally you name the varying with vAttributeName
    vNormal = normal;
    vUv = uv;
    vUv2 = uv2;
    vPosition = position;

    // This sets the position of the vertex in 3d space. The correct math is
    // provided below to take into account camera and object data.
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`,
  fragment:

`
/**
* Example Fragment Shader
* Sets the color and alpha of the pixel by setting gl_FragColor
*/

// Set the precision for data types used in this shader
precision highp float;
precision highp int;

// Default THREE.js uniforms available to both fragment and vertex shader
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

// Default uniforms provided by ShaderFrog.
uniform vec3 cameraPosition;
uniform float time;

// A uniform unique to this shader. You can modify it to the using the form
// below the shader preview. Any uniform you add is automatically given a form
uniform vec3 color;
uniform float scale;
uniform float radius;

// Example varyings passed from the vertex shader
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

float grid(vec2 p)
{
    float factor = scale/(length(cameraPosition)-radius);
    factor = exp2(ceil(log2(factor)));
    return smoothstep(0.98,1.0,max(sin((p.x)*3.14*factor),cos((p.y)*3.14*factor)));
}

void main() {
    gl_FragColor = vec4( color*grid(vUv), 1.0 );

}
`
}
const gridmat2 = {
  vertex:

`

`,
  fragment:

`

`
}
const holographic = {
  vertex:``,
  fragment:``
}
const water1 = {
  vertex:

`
"/**\n* Example Vertex Shader\n* Sets the position of the vertex by setting gl_Position\n*/\n\n// Set the precision for data types used in this shader\nprecision highp float;
\nprecision highp int;\n\n// Default THREE.js uniforms available to both fragment and vertex shader\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\n\n// Default uniforms provided by ShaderFrog.\nuniform vec3 cameraPosition;\nuniform float time;\n\n// Default attributes provided by THREE.js. Attributes are only available in the\n// vertex shader. You can pass them to the fragment shader using varyings\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n\n// Examples of variables passed from vertex to fragment shader\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\n\nvoid main() {\n\n    // To pass variables to the fragment shader, you assign them here in the\n    // main function. Traditionally you name the varying with vAttributeName\n    vNormal = normal;\n    vUv = uv;\n    vUv2 = uv2;\n    vPosition = position;\n\n    // This sets the position of the vertex in 3d space. The correct math is\n    // provided below to take into account camera and object data.\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}"
`,
  fragment:

`
"/**\n* Example Fragment Shader\n* Sets the color and alpha of the pixel by setting gl_FragColor\n*/\n\n// Set the precision for data types used in this shader\nprecision highp float;\nprecision highp int;\n\n// Default THREE.js uniforms available to both fragment and vertex shader\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\n\n// Default uniforms provided by ShaderFrog.\nuniform vec3 cameraPosition;\nuniform float time;\n\n// A uniform unique to this shader. You can modify it to the using the form\n// below the shader preview. Any uniform you add is automatically given a form\nuniform vec3 color;\nuniform float scale;\nuniform float radius;\n\n// Example varyings passed from the vertex shader\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\nfloat grid(vec2 p)\n{\n    float factor = scale/(length(cameraPosition)-radius);\n    factor = exp2(ceil(log2(factor)));\n    return smoothstep(0.98,1.0,max(sin((p.x)*3.14*factor),cos((p.y)*3.14*factor)));\n}\n\nvoid main() {\n    gl_FragColor = vec4( color*grid(vUv), 1.0 );\n\n}"
`
}
const abstract = {
fragment:

`
void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec2 uv =  (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    for(float i = 1.0; i < 10.0; i++){
        uv.x += 0.6 / i * cos(i * 2.5* uv.y + iTime);
        uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime);
    }

    fragColor = vec4(vec3(0.1)/abs(sin(iTime-uv.y-uv.x)),1.0);
}
`
}
const fire_clouds = {
  fragment:

`
/*--------------------------------------------------------------------------------------
License CC0 - http://creativecommons.org/publicdomain/zero/1.0/
To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
----------------------------------------------------------------------------------------
^This means do anything you want with this code. Because we are programmers, not lawyers.

-Otavio Good
*/

float localTime = 0.0;
float marchCount;

float PI=3.14159265;

vec3 saturate(vec3 a) { return clamp(a, 0.0, 1.0); }
vec2 saturate(vec2 a) { return clamp(a, 0.0, 1.0); }
float saturate(float a) { return clamp(a, 0.0, 1.0); }

vec3 RotateX(vec3 v, float rad)
{
  float cos = cos(rad);
  float sin = sin(rad);
  return vec3(v.x, cos * v.y + sin * v.z, -sin * v.y + cos * v.z);
}
vec3 RotateY(vec3 v, float rad)
{
  float cos = cos(rad);
  float sin = sin(rad);
  return vec3(cos * v.x - sin * v.z, v.y, sin * v.x + cos * v.z);
}
vec3 RotateZ(vec3 v, float rad)
{
  float cos = cos(rad);
  float sin = sin(rad);
  return vec3(cos * v.x + sin * v.y, -sin * v.x + cos * v.y, v.z);
}


// noise functions
float Hash2d(vec2 uv)
{
    float f = uv.x + uv.y * 37.0;
    return fract(sin(f)*104003.9);
}
float Hash3d(vec3 uv)
{
    float f = uv.x + uv.y * 37.0 + uv.z * 521.0;
    return fract(sin(f)*110003.9);
}
float mixP(float f0, float f1, float a)
{
    return mix(f0, f1, a*a*(3.0-2.0*a));
}
const vec2 zeroOne = vec2(0.0, 1.0);
float noise2d(vec2 uv)
{
    vec2 fr = fract(uv.xy);
    vec2 fl = floor(uv.xy);
    float h00 = Hash2d(fl);
    float h10 = Hash2d(fl + zeroOne.yx);
    float h01 = Hash2d(fl + zeroOne);
    float h11 = Hash2d(fl + zeroOne.yy);
    return mixP(mixP(h00, h10, fr.x), mixP(h01, h11, fr.x), fr.y);
}
float noiseValue(vec3 uv)
{
    vec3 fr = fract(uv.xyz);
    vec3 fl = floor(uv.xyz);
    float h000 = Hash3d(fl);
    float h100 = Hash3d(fl + zeroOne.yxx);
    float h010 = Hash3d(fl + zeroOne.xyx);
    float h110 = Hash3d(fl + zeroOne.yyx);
    float h001 = Hash3d(fl + zeroOne.xxy);
    float h101 = Hash3d(fl + zeroOne.yxy);
    float h011 = Hash3d(fl + zeroOne.xyy);
    float h111 = Hash3d(fl + zeroOne.yyy);
    return mixP(
        mixP(mixP(h000, h100, fr.x),
             mixP(h010, h110, fr.x), fr.y),
        mixP(mixP(h001, h101, fr.x),
             mixP(h011, h111, fr.x), fr.y)
        , fr.z);
}

// IQ's style of super fast texture noise
float noiseTex(in vec3 x)
{
    vec3 fl = floor(x);
    vec3 fr = fract(x);
	fr = fr * fr * (3.0 - 2.0 * fr);
	vec2 uv = (fl.xy + vec2(37.0, 17.0) * fl.z) + fr.xy;
	vec2 rg = textureLod(iChannel0, (uv + 0.5) * 0.00390625, 0.0 ).xy;
	return mix(rg.y, rg.x, fr.z);
}
// 2 components returned
vec2 noiseTex2(in vec3 x)
{
    vec3 fl = floor(x);
    vec3 fr = fract(x);
	fr = fr * fr * (3.0 - 2.0 * fr);
	vec2 uv = (fl.xy + vec2(37.0, 17.0) * fl.z) + fr.xy;
	vec4 rgba = textureLod(iChannel0, (uv + 0.5) * 0.00390625, 0.0 ).xyzw;
	return mix(rgba.yw, rgba.xz, fr.z);
}

vec3 camPos = vec3(0.0), camFacing;
vec3 camLookat=vec3(0,0.0,0);

// polynomial smooth min (k = 0.1);
float smin(float a, float b, float k)
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}
float smax(float a, float b, float k)
{
    float h = clamp( 0.5+0.5*((-b)+a)/k, 0.0, 1.0 );
    return -(mix( -b, -a, h ) - k*h*(1.0-h));
}

vec2 matMin(vec2 a, vec2 b)
{
	if (a.x < b.x) return a;
	else return b;
}

// Calculate the distance field that defines the object.
vec2 DistanceToObject(in vec3 p)
{
    // first distort the y with some noise so it doesn't look repetitive.
    //p.xyz = RotateY(p, length(p.xz) + iTime);
    //p.y += 0.1;
    //p.xyz = RotateZ(p, length(p.z) + iTime);
    p.y += noiseTex(p*0.5)*0.5;
    // multiple frequencies of noise, with time added for animation
    float n = noiseTex(p*2.0+iTime*0.6);
    n += noiseTex(p*4.0+iTime*0.7)*0.5;
    n += noiseTex(p*8.0)*0.25;
    n += noiseTex(p*16.0)*0.125;
    n += noiseTex(p*32.0)*0.0625;
    n += noiseTex(p*64.0)*0.0625*0.5;
    n += noiseTex(p*128.0)*0.0625*0.25;
    // subtract off distance for cloud thickness
    float dist = n*0.25 - (0.275);// - abs(p.y*0.02)/* - iTime*0.01*/);
    //dist = smax(dist, -(length(p-camPos) - 0.3), 0.1);	// nice near fade
    // smooth blend subtract repeated layers
    dist = smax(dist, -(abs(fract(p.y*4.0)-0.5) - 0.15), 0.4);
    vec2 distMat = vec2(dist, 0.0);
    // sun in the distance
    distMat = matMin(distMat, vec2(length(p-camLookat - vec3(0.0, 0.5, -1.0)) - 0.6, 6.0));
    return distMat;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    localTime = iTime - 0.0;
	// ---------------- First, set up the camera rays for ray marching ----------------
	vec2 uv = fragCoord.xy/iResolution.xy * 2.0 - 1.0;
    float zoom = 1.7;
    uv /= zoom;

	// Camera up vector.
	vec3 camUp=vec3(0,1,0);

	// Camera lookat.
	camLookat=vec3(0,0.0,0);

    // debugging camera
    float mx=(iMouse.x/iResolution.x+0.375)*PI*2.0-0.7 + localTime*3.1415 * 0.0625*0.666*0.0;
	float my=-iMouse.y*0.0/iResolution.y*10.0 - sin(localTime * 0.31)*0.5*0.0;//*PI/2.01;
	camPos += vec3(cos(my)*cos(mx),sin(my),cos(my)*sin(mx))*(3.2);
    camPos.z -= iTime * 0.5;
    camLookat.z -= iTime * 0.5;

    // add randomness to camera for depth-of-field look close up.
    // Reduces the banding the the marchcount glow causes
    camPos += vec3(Hash2d(uv)*0.91, Hash2d(uv+37.0), Hash2d(uv+47.0))*0.01;

	// Camera setup.
	vec3 camVec=normalize(camLookat - camPos);
	vec3 sideNorm=normalize(cross(camUp, camVec));
	vec3 upNorm=cross(camVec, sideNorm);
	vec3 worldFacing=(camPos + camVec);
	vec3 worldPix = worldFacing + uv.x * sideNorm * (iResolution.x/iResolution.y) + uv.y * upNorm;
	vec3 rayVec = normalize(worldPix - camPos);

	// ----------------------------------- Animate ------------------------------------
	// --------------------------------------------------------------------------------
	vec2 distAndMat = vec2(0.5, 0.0);
    const float nearClip = 0.02;
	float t = nearClip;
	float maxDepth = 10.0;
	vec3 pos = vec3(0,0,0);
    marchCount = 0.0;
    {
        // ray marching time
        for (int i = max(0,-iFrame); i < 150; i++)	// This is the count of the max times the ray actually marches.
        {
            pos = camPos + rayVec * t;
            // *******************************************************
            // This is _the_ function that defines the "distance field".
            // It's really what makes the scene geometry.
            // *******************************************************
            distAndMat = DistanceToObject(pos);
            if ((t > maxDepth) || (abs(distAndMat.x) < 0.0025)) break;
            // move along the ray
            t += distAndMat.x * 0.7;
            //marchCount+= (10.0-distAndMat.x)*(10.0-distAndMat.x)*1.2;//distance(lastPos, pos);
            marchCount+= 1.0/distAndMat.x;
        }
    }

    // --------------------------------------------------------------------------------
	// Now that we have done our ray marching, let's put some color on this geometry.

	vec3 finalColor = vec3(0.0);

	// If a ray actually hit the object, let's light it.
	if (abs(distAndMat.x) < 0.0025)
   // if (t <= maxDepth)
	{
        // ------ Calculate texture color ------
        vec3 texColor = vec3(0.2, 0.26, 0.21)*0.75;
        // sun material
        if (distAndMat.y == 6.0) texColor = vec3(0.51, 0.21, 0.1)*10.5;
        finalColor = texColor;

        // visualize length of gradient of distance field to check distance field correctness
        //finalColor = vec3(0.5) * (length(normalU) / smallVec.x);
        //finalColor = normal * 0.5 + 0.5;
	}
    else
    {
    }
    // This is the glow
    finalColor += marchCount * vec3(4.2, 1.0, 0.41) * 0.0001;
    // fog
	finalColor = mix(vec3(0.91, 0.81, 0.99)*1.75, finalColor, exp(-t*0.15));

    if (t <= nearClip) finalColor = vec3(1.9, 1.1, 0.9)*0.25 * noiseTex(vec3(iTime*8.0));

    // vignette?
    finalColor *= vec3(1.0) * pow(saturate(1.0 - length(uv/2.5)), 2.0);
    finalColor *= 1.2;
    finalColor *= 0.85;

	// output the final color with sqrt for "gamma correction"
	fragColor = vec4(sqrt(clamp(finalColor, 0.0, 1.0)),1.0);
}
`
}
const portal = {
  fragment:
`
#define M_PI 3.1415926535897932384626433832795
#define M_TWO_PI (2.0 * M_PI)

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898,12.1414))) * 83758.5453);
}

float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n);
    vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

vec3 ramp(float t) {
	return t <= .5 ? vec3( 1. - t * 1.4, .2, 1.05 ) / t : vec3( .3 * (1. - t) * 2., .2, 1.05 ) / t;
}
vec2 polarMap(vec2 uv, float shift, float inner) {

    uv = vec2(0.5) - uv;


    float px = 1.0 - fract(atan(uv.y, uv.x) / 6.28 + 0.25) + shift;
    float py = (sqrt(uv.x * uv.x + uv.y * uv.y) * (1.0 + inner * 2.0) - inner) * 2.0;

    return vec2(px, py);
}
float fire(vec2 n) {
    return noise(n) + noise(n * 2.1) * .6 + noise(n * 5.4) * .42;
}

float shade(vec2 uv, float t) {
    uv.x += uv.y < .5 ? 23.0 + t * .035 : -11.0 + t * .03;
    uv.y = abs(uv.y - .5);
    uv.x *= 35.0;

    float q = fire(uv - t * .013) / 2.0;
    vec2 r = vec2(fire(uv + q / 2.0 + t - uv.x - uv.y), fire(uv + q - t));

    return pow((r.y + r.y) * max(.0, uv.y) + .1, 4.0);
}

vec3 color(float grad) {

    float m2 = iMouse.z < 0.0001 ? 1.15 : iMouse.y * 3.0 / iResolution.y;
    grad =sqrt( grad);
    vec3 color = vec3(1.0 / (pow(vec3(0.5, 0.0, .1) + 2.61, vec3(2.0))));
    vec3 color2 = color;
    color = ramp(grad);
    color /= (m2 + max(vec3(0), color));

    return color;

}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

    float m1 = iMouse.z < 0.0001 ? 3.6 : iMouse.x * 5.0 / iResolution.x;

    float t = iTime;
    vec2 uv = fragCoord / iResolution.yy;
    float ff = 1.0 - uv.y;
    uv.x -= (iResolution.x / iResolution.y - 1.0) / 2.0;
    vec2 uv2 = uv;
    uv2.y = 1.0 - uv2.y;
   	uv = polarMap(uv, 1.3, m1);
   	uv2 = polarMap(uv2, 1.9, m1);

    vec3 c1 = color(shade(uv, t)) * ff;
    vec3 c2 = color(shade(uv2, t)) * (1.0 - ff);

    fragColor = vec4(c1 + c2, 1.0);
}
`
}
const sun = {
  fragment:

`
void mainImage( out vec4 fragColor, in vec2 fragCoord ){

    //***********    Basic setup    **********

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
	// Position of fragment relative to centre of screen
    vec2 pos = 0.5 - uv;
    // Adjust y by aspect for uniform transforms
    pos.y /= iResolution.x/iResolution.y;

    //**********         Glow        **********

    // Equation 1/x gives a hyperbola which is a nice shape to use for drawing glow as
    // it is intense near 0 followed by a rapid fall off and an eventual slow fade
    float dist = 1.0/length(pos);

    //**********        Radius       **********

    // Dampen the glow to control the radius
    dist *= 0.1;

    //**********       Intensity     **********

    // Raising the result to a power allows us to change the glow fade behaviour
    // See https://www.desmos.com/calculator/eecd6kmwy9 for an illustration
    // (Move the slider of m to see different fade rates)
    dist = pow(dist, 0.8);

    // Knowing the distance from a fragment to the source of the glow, the above can be
    // written compactly as:
    //	float getGlow(float dist, float radius, float intensity){
    //		return pow(radius/dist, intensity);
	//	}
    // The returned value can then be multiplied with a colour to get the final result

    // Add colour
    vec3 col = dist * vec3(1.0, 0.5, 0.25);

    // Tonemapping. See comment by P_Malin
    col = 1.0 - exp( -col );

    // Output to screen
    fragColor = vec4(col, 1.0);
}
`
}
const storm = {
  fragment:
`
//	Ray marched lightning with a volumetric cloud.
//
//	The bolts are capped cylinders which are offset by Perlin noise FBM and animated in time
//	to look like electrical discharges. The glow is achieved by accumulating distance based
//	glow along view rays. Internal flashes are additional ambient terms in the cloud lighting.
//
//	See https://www.shadertoy.com/view/3sffzj for cloud.

const vec3 sunLightColour = vec3(1.0);
const vec3 skyColour = vec3(0);
const vec3 horizonColour = vec3(1, 0.9, 0.8);

//---------------------- Lightning ----------------------
const int MAX_STEPS = 32;
const float MIN_DIST = 0.1;
const float MAX_DIST = 1000.0;
const float EPSILON = 1e-4;

const vec3 boltColour = vec3(0.3, 0.6, 1.0);

const float strikeFrequency = 0.1;
//The speed and duration of the bolts. The speed and frequency are linked
float speed =1.0;

const float internalFrequency = 0.5;
//Movement speed of lightning inside the cloud
const float internalSpeed = 5.0;

//Locations of the three bolts
vec2 bolt0 = vec2(1e10);
vec2 bolt1 = vec2(1e10);
vec2 bolt2 = vec2(1e10);

//------------------------ Cloud ------------------------
const float CLOUD_START = 30.0;
const float CLOUD_HEIGHT = 40.0;
const float CLOUD_END = CLOUD_START + CLOUD_HEIGHT;
//For size of AABB
const float CLOUD_EXTENT = 30.0;

const int STEPS_PRIMARY = 24;
const int STEPS_LIGHT = 6;

//Offset the sample point by blue noise every frame to get rid of banding
#define DITHERING
const float goldenRatio = 1.61803398875;

const vec3 minCorner = vec3(-CLOUD_EXTENT, CLOUD_START, -CLOUD_EXTENT);
const vec3 maxCorner = vec3(CLOUD_EXTENT, CLOUD_END, CLOUD_EXTENT);

const float power = 6.0;
const float densityMultiplier = 6.5;

vec3 rayDirection(float fieldOfView, vec2 fragCoord) {
    vec2 xy = fragCoord - iResolution.xy / 2.0;
    float z = (0.5 * iResolution.y) / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

//https://www.geertarien.com/blog/2017/07/30/breakdown-of-the-lookAt-function-in-OpenGL/
mat3 lookAt(vec3 camera, vec3 targetDir, vec3 up){
    vec3 zaxis = normalize(targetDir);
    vec3 xaxis = normalize(cross(zaxis, up));
    vec3 yaxis = cross(xaxis, zaxis);

    return mat3(xaxis, yaxis, -zaxis);
}

//https://www.shadertoy.com/view/3s3GDn
float getGlow(float dist, float radius, float intensity){
    dist = max(dist, 1e-6);
    return pow(radius/dist, intensity);
}

//---------------------------- 1D Perlin noise ----------------------------
//Used to shape lightning bolts
//https://www.shadertoy.com/view/lt3BWM

#define HASHSCALE 0.1031

float hash(float p){
    vec3 p3  = fract(vec3(p) * HASHSCALE);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

float fade(float t) { return t*t*t*(t*(6.*t-15.)+10.); }

float grad(float hash, float p){
    int i = int(1e4*hash);
    return (i & 1) == 0 ? p : -p;
}

float perlinNoise1D(float p){
    float pi = floor(p), pf = p - pi, w = fade(pf);
    return mix(grad(hash(pi), pf), grad(hash(pi + 1.0), pf - 1.0), w) * 2.0;
}

//---------------------------- 3D Perlin noise ----------------------------
//Used to shape cloud

//https://www.shadertoy.com/view/4djSRW
vec3 hash33(vec3 p3){
    p3 = fract(p3 * vec3(.1031,.11369,.13787));
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

float perlinNoise3D(vec3 p){
    vec3 pi = floor(p);
    vec3 pf = p - pi;

    vec3 w = pf * pf * (3.0 - 2.0 * pf);

    return 	mix(
        mix(
            mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                w.x),
            mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                w.x),
            w.z),
        mix(
            mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                w.x),
            mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                w.x),
            w.z),
        w.y);
}

//---------------------------- Distance ---------------------------

bool intersectPlane(vec3 n, vec3 p, vec3 org, vec3 dir, out float t){
    //Assuming vectors are all normalized
    float denom = dot(n, dir);
    if(denom > 1e-6) {
        t = dot(p - org, n) / denom;
        return (t >= 0.0);
    }

    return false;
}

float sdCappedCylinder( vec3 p, float h, float r ){
    vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(h,r);
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float fbm(float pos, int octaves){
    if(pos < 0.0){
        return 0.0;
    }
    float total = 0.0;
    float frequency = 0.2;
    float amplitude = 1.0;
    for(int i = 0; i < octaves; i++){
        if(i > 2){
            pos += 0.5*iTime;
        }
        total += perlinNoise1D(pos * frequency) * amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return total;
}

float getSDF(vec3 p) {

    float dist = 1e10;

    //Shift everything to start at the cloud
    p.y -= CLOUD_START;

    //The counter of a bolt in a series
    float t = 0.0;
    //The offset of the series
    float shift = 0.0;

    //Number of noise levels for FBM
    int octaves = 4;
    //Scale of the y coordinate as noise input. Controls the smoothness of the bolt
    float scale = 0.5;
    //Offset to give simultaneous bolts different shapes
    float shapeOffset = 15.2;
    //Fraction of the total bolt length 0->1
    float progress;

    //The fraction of the lifetime of the bolt it takes for it to descend.
    //The bolt persists in full form for 1.0-descentDuration fraction of the total period.
    float descentDuration = 0.5;

    //Spatial range of the bolt
    float range = CLOUD_EXTENT*0.4;
    float boltLength = CLOUD_START*0.5;
    //Bolt thickness
    float radius = 0.01;
    //xz: the shape of the bolt
    //y:  progress used as bolt length and positioning
    vec3 offset;
    vec2 location;

    float time;

    for(int i = 0; i < 3; i++){

        shapeOffset *= 2.0;
        shift = fract(shift + 0.25);
        time = iTime * speed + shift;
        t = floor(time)+1.0;

        //Reset the position of the iteration bolt
        if(i == 0){
        	bolt0 = vec2(1e10);
        }
        if(i == 1){
        	bolt1 = vec2(1e10);
        }
        if(i == 2){
        	bolt2 = vec2(1e10);
        }

        //Bolts strike randomly
        if(hash(float(i)+t*0.026) > strikeFrequency){
            continue;
        }
        location = 2.0*vec2(hash(t+float(i)+0.43), hash(t+float(i)+0.3))-1.0;
        location *= range;
        progress = clamp(fract(time)/descentDuration, 0.0, 1.0);

        //Briefly increase the radius of the bolt the moment it makes contact
        if(progress > 0.95 && fract(time) - descentDuration < 0.1){
            radius = 0.1;
        }else{
            radius = 0.01;
        }
        progress *= boltLength;
        offset = vec3(location.x+fbm(shapeOffset+t*0.2+(scale*p.y), octaves),
                      progress,
                      location.y+fbm(shapeOffset+t*0.12-(scale*p.y), octaves));

        //Store the xz location of the iteration bolt
        //Raymarching translations are reversed so invert the sign
        if(i == 0){
        	bolt0 = -location.xy;
        }
        if(i == 1){
        	bolt1 = -location.xy;
        }
        if(i == 2){
        	bolt2 = -location.xy;
        }
        dist = min(dist, sdCappedCylinder(p+offset, radius, progress));
    }

    return dist;
}

float distanceToScene(vec3 cameraPos, vec3 rayDir, float start, float end, out vec3 glow) {

    float depth = start;
    float dist;

    for (int i = 0; i < MAX_STEPS; i++) {

        vec3 p = cameraPos + depth * rayDir;
        //Warping the cylinder breaks the shape. Reduce step size to avoid this.
        dist = 0.5*getSDF(p);
        //Accumulate the glow along the view ray.
        glow += getGlow(dist, 0.01, 0.8) * boltColour;

        if (dist < EPSILON){
            return depth;
        }

        depth += dist;

        if (depth >= end){
            return end;
        }
    }

    return end;
}

vec3 getSkyColour(vec3 rayDir){
    if(rayDir.y < 0.0){
        return vec3(0.025);
    }

    return mix(horizonColour, skyColour, pow(rayDir.y, 0.03));
}


//---------------------------- Cloud shape ----------------------------

//https://gist.github.com/DomNomNom/46bb1ce47f68d255fd5d
//Compute the near and far intersections using the slab method.
//No intersection if tNear > tFar.
vec2 intersectAABB(vec3 rayOrigin, vec3 rayDir, vec3 boxMin, vec3 boxMax) {
    vec3 tMin = (boxMin - rayOrigin) / rayDir;
    vec3 tMax = (boxMax - rayOrigin) / rayDir;
    vec3 t1 = min(tMin, tMax);
    vec3 t2 = max(tMin, tMax);
    float tNear = max(max(t1.x, t1.y), t1.z);
    float tFar = min(min(t2.x, t2.y), t2.z);
    return vec2(tNear, tFar);
}

bool insideAABB(vec3 p){
    float eps = 1e-4;
    return  (p.x > minCorner.x-eps) && (p.y > minCorner.y-eps) && (p.z > minCorner.z-eps) &&
        (p.x < maxCorner.x+eps) && (p.y < maxCorner.y+eps) && (p.z < maxCorner.z+eps);
}

bool getCloudIntersection(vec3 org, vec3 dir, out float distToStart, out float totalDistance){
    vec2 intersections = intersectAABB(org, dir, minCorner, maxCorner);

    if(insideAABB(org)){
        intersections.x = 1e-4;
    }

    distToStart = intersections.x;
    totalDistance = intersections.y - intersections.x;
    return intersections.x > 0.0 && (intersections.x < intersections.y);
}

float saturate(float x){
    return clamp(x, 0.0, 1.0);
}

float remap(float x, float low1, float high1, float low2, float high2){
    return low2 + (x - low1) * (high2 - low2) / (high1 - low1);
}

float getNoise(vec3 pos, float speed){
    return 0.5+0.5*(perlinNoise3D(speed*iTime+pos));
}

float clouds(vec3 p, out float cloudHeight){

	//Model an anvil cloud with two flipped hemispheres

    cloudHeight = saturate((p.y - CLOUD_START)/(CLOUD_END-CLOUD_START));

    float bottom = 1.0-saturate(length(p.xz)/(1.25*CLOUD_EXTENT));

    //Round top and bottom edges
    bottom *= saturate(remap(cloudHeight, 0.25*bottom, 1.0, 1.0, 0.0))
        	* saturate(remap(cloudHeight, 0.0, 0.175, 0.45, 1.0));

    //Subtract coarse noise
    bottom = saturate(remap(bottom, 0.5*getNoise(0.25*p, 0.05), 1.0, 0.0, 1.0));
    //Subtract fine noise
    bottom = saturate(remap(bottom, 0.15*getNoise(1.0*p, 0.2), 1.0, 0.0, 1.0));

    float top = 1.0-saturate(length(p.xz)/(1.5*CLOUD_EXTENT));

    //Round top and bottom edges
    top *= saturate(remap(1.0-cloudHeight, 0.25*top, 1.0, 1.0, 0.0))
        * saturate(remap(1.0-cloudHeight, 0.0, 0.175, 0.45, 1.0));

    //Subtract coarse noise
    top = saturate(remap(top, 0.5*getNoise(0.25*p, 0.05), 1.0, 0.0, 1.0));
    //Subtract fine noise
    top = saturate(remap(top, 0.15*getNoise(1.0*p, 0.2), 1.0, 0.0, 1.0));

    return (bottom+top)*densityMultiplier;
}

//---------------------------- Cloud lighting ----------------------------

float HenyeyGreenstein(float g, float costh){
    return (1.0/(4.0 * 3.1415))  * ((1.0 - g * g) / pow(1.0 + g*g - 2.0*g*costh, 1.5));
}

//Get the amount of light that reaches a sample point.
float lightRay(vec3 org, vec3 p, float phaseFunction, float mu, vec3 sunDirection){
    float lightRayDistance = CLOUD_EXTENT*0.75;
    float distToStart = 0.0;

    getCloudIntersection(p, sunDirection, distToStart, lightRayDistance);

    float stepL = lightRayDistance/float(STEPS_LIGHT);

    float lightRayDensity = 0.0;

    float cloudHeight = 0.0;

    //Collect total density along light ray.
    for(int j = 0; j < STEPS_LIGHT; j++){
        //Reduce density of clouds when looking towards the sun for more luminous clouds.
        lightRayDensity += mix(1.0, 0.75, mu) *
            clouds(p + sunDirection * float(j) * stepL, cloudHeight);
    }

    //Multiple scattering approximation from Nubis presentation credited to Wrenninge et al.
    //Introduce another weaker Beer-Lambert function.
    float beersLaw = max(exp(-stepL * lightRayDensity),
                         exp(-stepL * lightRayDensity * 0.2) * 0.75);

    //Return product of Beer's law and powder effect depending on the
    //view direction angle with the light direction.
    return mix(beersLaw * 2.0 * (1.0-(exp(-stepL*lightRayDensity*2.0))), beersLaw, mu);
}

vec3 hash31(float p){
   vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
   p3 += dot(p3, p3.yzx+33.33);
   return fract((p3.xxy+p3.yzz)*p3.zyx);
}

//Get the colour along the main view ray.
vec3 mainRay(vec3 org, vec3 dir, vec3 sunDirection,
             out float totalTransmittance, float mu, vec3 sunLightColour, float offset,
             inout float d){

    //Variable to track transmittance along view ray.
    //Assume clear sky and attenuate light when encountering clouds.
    totalTransmittance = 1.0;

    //Default to black.
    vec3 colour = vec3(0.0);

    //The distance at which to start ray marching.
    float distToStart = 0.0;

    //The length of the intersection.
    float totalDistance = 0.0;

    //Determine if ray intersects bounding volume.
    //Set ray parameters in the cloud layer.
    bool renderClouds = getCloudIntersection(org, dir, distToStart, totalDistance);

    if(!renderClouds){
        return colour;
    }

    //Sampling step size.
    float stepS = totalDistance / float(STEPS_PRIMARY);

    //Offset the starting point by blue noise.
    distToStart += stepS * offset;

    //Track distance to sample point.
    float dist = distToStart;

    //Initialise sampling point.
    vec3 p = org + dist * dir;

    //Combine backward and forward scattering to have details in all directions.
    float phaseFunction = mix(HenyeyGreenstein(-0.3, mu), HenyeyGreenstein(0.3, mu), 0.7);

    vec3 sunLight = sunLightColour * power;

    for(int i = 0; i < STEPS_PRIMARY; i++){

        //Normalised height for shaping and ambient lighting weighting.
        float cloudHeight;

        //Get density and cloud height at sample point
        float density = clouds(p, cloudHeight);

        //Scattering and absorption coefficients.
        float sigmaS = 1.0;
        float sigmaA = 0.0;

        //Extinction coefficient.
        float sigmaE = sigmaS + sigmaA;

        float sampleSigmaS = sigmaS * density;
        float sampleSigmaE = sigmaE * density;

        //If there is a cloud at the sample point
        if(density > 0.0 ){
            //Store closest distance to the cloud
            d = min(d, dist);

            //Internal lightning is additional ambient source that flickers and moves around
            //Get random position in the core of the cloud
            vec3 source = vec3(0, CLOUD_START + CLOUD_HEIGHT * 0.5, 0) +
                		 (2.0*hash31(floor(iTime*internalSpeed))-1.0) * CLOUD_EXTENT * 0.25;
            //Distance to the source position
            float prox = length(p - source);
            //Vary size for flicker
            float size = sin(45.0*fract(iTime))+5.0;
            //Get distance based glow
            vec3 internal = getGlow(prox, size, 3.2) * boltColour;
            //Internal lightning occurs randomly
            if(hash(floor(iTime)) > internalFrequency){
            	internal = vec3(0);
            }

            //Add ambient source at bottom of cloud where lightning bolts exit
            size = 3.0;
            float h = 0.9*CLOUD_START;
            prox = length(p - vec3(bolt0.x, h, bolt0.y));
            internal += getGlow(prox, size, 2.2) * boltColour;

            prox = length(p - vec3(bolt1.x, h, bolt1.y));
            internal += getGlow(prox, size, 2.2) * boltColour;

            prox = length(p - vec3(bolt2.x, h, bolt2.y));
            internal += getGlow(prox, size, 2.2) * boltColour;

            //Combine lightning and height based ambient light
            vec3 ambient = internal + sunLightColour * mix((0.05), (0.125), cloudHeight);

            //Amount of sunlight that reaches the sample point through the cloud
            //is the combination of ambient light and attenuated direct light.
            vec3 luminance = ambient + sunLight * phaseFunction *
                			 lightRay(org, p, phaseFunction, mu, sunDirection);

            //Scale light contribution by density of the cloud.
            luminance *= sampleSigmaS;

            //Beer-Lambert.
            float transmittance = exp(-sampleSigmaE * stepS);

            //Better energy conserving integration
            //"From Physically based sky, atmosphere and cloud rendering in Frostbite" 5.6
            //by Sebastian Hillaire.
            colour +=
                totalTransmittance * (luminance - luminance * transmittance) / sampleSigmaE;

            //Attenuate the amount of light that reaches the camera.
            totalTransmittance *= transmittance;

            //If ray combined transmittance is close to 0, nothing beyond this sample
            //point is visible, so break early.
            if(totalTransmittance <= 0.01){
                totalTransmittance = 0.0;
                break;
            }
        }

        dist += stepS;

        //Step along ray.
        p = org + dir * dist;
    }

    return colour;
}

//https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/
vec3 ACESFilm(vec3 x){
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){


    //----------------- Define a camera -----------------

    vec3 rayDir = rayDirection(40.0, fragCoord);

    vec3 cameraPos = texelFetch(iChannel0, ivec2(0.5, 1.5), 0).xyz;

    vec3 targetDir = vec3(0,20,0) - cameraPos;

    vec3 up = vec3(0.0, 1.0, 0.0);

    //Get the view matrix from the camera orientation
    mat3 viewMatrix = lookAt(cameraPos, targetDir, up);

    //Transform the ray to point in the correct direction
    rayDir = normalize(viewMatrix * rayDir);

    //---------------------------------------------------

    float offset = 0.0;

    #ifdef DITHERING
    //Sometimes the blue noise texture is not immediately loaded into iChannel1
    //leading to jitters.
    if(iChannelResolution[1].xy == vec2(1024)){
        //From https://blog.demofox.org/2020/05/10/ray-marching-fog-with-blue-noise/
        //Get blue noise for the fragment.
        float blueNoise = texture(iChannel1, fragCoord / 1024.0).r;
        offset = fract(blueNoise + float(iFrame%32) * goldenRatio);
    }
    #endif

    //Lightning. Set bolt positions and accumulate glow.
    vec3 glow = vec3(0);
    float dist = distanceToScene(cameraPos, rayDir, MIN_DIST, MAX_DIST, glow);

    //Cloud
    float totalTransmittance = 1.0;
    float exposure = 0.5;
    vec3 sunDirection = normalize(vec3(1));
    float mu = 0.5+0.5*dot(rayDir, sunDirection);
    //Distance to cloud.
    float d = 1e10;
    vec3 colour = exposure * mainRay(cameraPos, rayDir, sunDirection, totalTransmittance,
                                     mu, sunLightColour, offset, d);

    vec3 background = getSkyColour(rayDir);
	//Draw sun
    background += sunLightColour * 0.2*getGlow(1.0-mu, 0.001, 0.55);

    //Distance to plane at cloud bottom limit
	float t = 1e10;
    bool hitsPlane = intersectPlane(vec3(0, -1, 0), vec3(0, CLOUD_START, 0.0), cameraPos,
                                    rayDir, t);

    //t is distance to the plane below which lightning bolts occur, d is distance to the cloud
    //If lightning is behind cloud, add it to the background and draw the cloud in front.
    if(t >= d){
        background += glow;
    }

    colour += background * totalTransmittance;

    //If lightning is in front of the cloud, add it last. As the glow has no depth data,
    //don't display it if above the bottom limit plane to avoid mixing error.
    if((t < d && hitsPlane) || cameraPos.y < CLOUD_START){
        colour += glow;
    }

    //Tonemapping
    colour = ACESFilm(colour);

    //Gamma correction 1.0/2.2 = 0.4545...
    colour = pow(colour, vec3(0.4545));

    // Output to screen
    fragColor = vec4(colour, 1.0);
}
`
}
const envnoise_firecloud = {
  fragment:
`
// inspired from iq's 3d noise functions
// https://www.shadertoy.com/view/4tySWK
// https://www.shadertoy.com/view/XsjXRm

#define sc 1.
#define sa 2. + abs(cos(iTime*1000.0)*.3)
#define sf 4.
#define sd 10.
#define sp .03
#define rd 1.0
#define r iResolution.xy

mat3 m = mat3( 0.00,  0.80,  0.60, -0.80,  0.36, -0.48, -0.60, -0.48,  .64 );

float hash( float n ){
    return fract(sin(n)*29291.5453123) ;
    //55924791.5453123
}

float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(2.9-1.9*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
}

float fbm( vec3 p ){
    float f =.500*noise( p );
  	p = m*p*2.02;
    f += .52500*noise( p );
	p = m*p*3.03;
    f += 0.1250*noise( p );
	p = m*p*2.01;
    f += 0.0625*noise( p );
    return f/0.9375;

}

vec3 gr(float s){
  return vec3(8.0, max(2.5-s*1.5, 0.5), max(s>.5?4.0-(s-.5)*5.0:.5, 0.0));
}



bool isp(vec3 org, vec3 dir, out float tmin, out float tmax){
    bool hit = false;
    float a = dot(dir, dir);
    float b = 2.0*dot(org, dir);
    float c = dot(org, org) - .7*0.5;
    float disc = b*b - 4.0*a*c;
    tmin = tmax = 1.0;

    if (disc > 0.0) {
        float sdisc = sqrt(disc);
        float t0 = (-b - sdisc)/(.1* a);
        float t1 = (-b + sdisc)/(2.2 * a);

        tmax = t1;
        if (t0 >= 0.0)
            tmin = t0;
        hit = true;
    }
    return hit;
}


vec2 rt(vec2 x,float y){
  return vec2(cos(y)*x.x-sin(y)*x.y,sin(y)*x.x+cos(y)*x.y);
}



void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

  vec2 p = (fragCoord.xy / iResolution.xy)*2.0-1.0;
  p.x *= iResolution.x/ iResolution.y;
  vec3 oo = vec3(0, 0, 1.0 - 0.425);
  vec3 od = normalize(vec3(p.x, p.y, -3.0 - cos(iTime*.1) *.1 ));
  vec3 o,d;
  o.xz = rt(oo.xz, .3*.5) ;
  o.y = oo.y;
  d.xz = rt(od.xz, .3*.5);
  d.y = od.y;


  vec4 col = vec4(0, 0, 0, 0);
  float tmin, tmax;
  if (isp(o, d, tmin, tmax))
  {

    for (float i = 0.0; i < sc; i+=1.0)
    {

      float t = tmin+i/sc;
      if (t > tmax)
        break;
      vec3 curpos = o + d*t;

      float s = (0.51-length(curpos))*.9 ;
      s*=s;

      float a = sa;
      float b = sf;
      float d = sd;
      for (int j = 0; j < 6; j++)
      {
        d += 0.5/abs((fbm(5.0*curpos*b+sp*(iTime*5.0)/b)*2.0-1.0)/a);
        b *= 2.0;
        a /= 2.0;
      }

      col.rgb += gr(s)*max(d*s,0.0);
    }
  }

 fragColor = col*2.0;
  vec3 c;
  float l,z=iTime*.5;
  for(int i=0;i<3;i++) {
    vec2 uv=gl_FragCoord.xy/r;
    p=uv*.15;
    uv=p;
    p-=.5;
    p.x*=r.x/r.y;
    z+=1.9;
    l=length(p);
    uv+=p/l*(sin(z)-1.1)*(cos(.1-z*.1));
    c[i]=.1/length(abs(mod(uv,1.))-.5);
    c[i]-=(.1 * float (i) * cos(z) );
  }
  fragColor-=vec4(c/l,iTime)*1.0 ;
}
`
}
const purple_star={
  fragment:
`
#define FAR 1000.0
#define SKIN 0.0001
#define STEPS 64
#define POS vec3(0.0)

float map(vec3 v)
{
    return length(v - POS) - 1.0;
}

float noise(vec3 x)
{
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = textureLod( iChannel0, (uv+0.5)/256.0, 0.0).yx;
	return mix( rg.x, rg.y, f.z );
}

float combonoise(vec3 x, float lac)
{
    float r = 0.0;
    float s = 1.0;
    for (int i = 0; i < 5; i++)
    {
        r += noise(x * s) / s;
        s *= lac;
    }
    return r;
}
float drawObject(in vec3 p)
{
    p = fract(p)-0.5;
    return dot(p,p);
    //p = abs(fract(p)-.5);
    //return dot(p, vec3(.5));
}
float voro(vec3 p)
{
    vec4 v, d;
    d.x = drawObject(p - vec3(.81, .62, .53));
    p.xy = vec2(p.y-p.x, p.y + p.x)*.7071;
    d.y = drawObject(p - vec3(.39, .2, .11));
    p.yz = vec2(p.z-p.y, p.z + p.y)*.7071;
    d.z = drawObject(p - vec3(.62, .24, .06));
    p.xz = vec2(p.z-p.x, p.z + p.x)*.7071;
    d.w = drawObject(p - vec3(.2, .82, .64));

    v.xy = min(d.xz, d.yw);
    v.z = min(max(d.x, d.y), max(d.z, d.w));
    v.w = max(v.x, v.y);

    d.x = min(v.z, v.w) - min(v.x, v.y);
    return d.x;
}

vec3 col(vec3 v)
{
    float f = length(v - POS) - 1.0;
    //if (f < SKIN) return vec3(1.0,1.0,1.0);
    //f += combonoise(v + vec3(0.0,0.0,iTime), 2.1);
    f += voro(v) * 6.0;
    return pow(vec3(0.25,0.05,0.4), vec3(f)) * 0.1;
}

vec3 rot(vec3 v, vec2 r)
{
	vec4 t = sin(vec4(r, r + 1.5707963268));
    vec4 g = vec4(v, dot(v.yz, t.yw));
    return vec3(g.x * t.z - g.w * t.x,
                g.y * t.w - g.z * t.y,
                g.x * t.x + g.w * t.z);
}

vec3 rotmap(vec3 v)
{
    return v;
}

void mainImage(out vec4 c, vec2 u)
{
    vec2 s = iResolution.xy * 0.5f;
    vec2 m = iMouse.xy * 0.01;
    vec3 r = rot(normalize(vec3((u - s) / s.y, 1.0)),m);
    vec3 o = rot(vec3(0.0,0.0,-5.0), m);
    vec3 l = vec3(0.0,0.0,0.0);
    float t = 0.0;
    for (int i = 0; i < STEPS; i++)
    {
        //float d = map(o + r * t);
        //t += d;
        t += 0.1;
    	l += col(o + r * t);
        if (t > FAR) break;
    }
    c = vec4(sqrt(l), 0.0);
}
`
}
const dragons_plasma={
  fragment:

`
// Simple but robust hash function
// From https://stackoverflow.com/a/12996028
uint hash(uint x)
{
    x = ((x >> 16u) ^ x) * 0x45d9f3bu;
    x = ((x >> 16u) ^ x) * 0x45d9f3bu;
    x = (x >> 16u) ^ x;
    return x;
}

// Combine hash values
// Based on Boost's hash_combine
// Note: While this is decent for general hashing, it has visual artifacts in many graphical uses, but works well in this case
uint combine(uint v, uint seed)
{
    return seed ^ (v + 0x9e3779b9u + (seed << 6) + (seed >> 2));
}

// Construct an uniform float in 0.0-1.0 range from bits given
// Based on method described in https://stackoverflow.com/a/17479300
float uniformFloat(uint h)
{
    return uintBitsToFloat(h & 0x007FFFFFu | 0x3F800000u) - 1.0;
}

// Construct "random" normal based on position and seed
vec3 normal(vec3 p, uint seed)
{
    uvec3 u = floatBitsToUint(p);
    seed = combine(hash(u.x), seed);
    seed = combine(hash(u.y), seed);
    seed = combine(hash(u.z), seed);
	float a = uniformFloat(seed);
    seed = combine(0x6d04955du, seed);
    float z = uniformFloat(seed) * 2.0 - 1.0;
    float s = sqrt(1.0 - z * z);
    return vec3(s * cos(a * 6.2831853 + vec2(0.0, -1.570796)), z);
}

// Regular smoothstep
vec3 ss(vec3 x)
{
    return x * x * (3.0 - 2.0 * x);
}

// Gradient noise from position and seed
float gnoise(vec3 p, uint seed)
{
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 a = ss(f);
    float n000 = dot(normal(i, seed), f);
    float n100 = dot(normal(i + vec3(1.0, 0.0, 0.0), seed), f - vec3(1.0, 0.0, 0.0));
    float n010 = dot(normal(i + vec3(0.0, 1.0, 0.0), seed), f - vec3(0.0, 1.0, 0.0));
    float n110 = dot(normal(i + vec3(1.0, 1.0, 0.0), seed), f - vec3(1.0, 1.0, 0.0));
    float n001 = dot(normal(i + vec3(0.0, 0.0, 1.0), seed), f - vec3(0.0, 0.0, 1.0));
    float n101 = dot(normal(i + vec3(1.0, 0.0, 1.0), seed), f - vec3(1.0, 0.0, 1.0));
    float n011 = dot(normal(i + vec3(0.0, 1.0, 1.0), seed), f - vec3(0.0, 1.0, 1.0));
    float n111 = dot(normal(i + vec3(1.0, 1.0, 1.0), seed), f - vec3(1.0, 1.0, 1.0));
    return mix(
        mix(mix(n000, n100, a.x), mix(n010, n110, a.x), a.y),
        mix(mix(n001, n101, a.x), mix(n011, n111, a.x), a.y), a.z);
}

// 3 element (separate) gradient noise values from position and seeds
vec3 gnoise3(vec3 p, uvec3 seed)
{
    return vec3(gnoise(p, seed.x), gnoise(p, seed.y), gnoise(p, seed.z));
}

// Modified noise value used
// Peaks at 1.0 for 0.0 noise values and go down linearly by distance from it
vec3 n(vec3 p, uvec3 seed)
{
    return max(1.0 - abs(gnoise3(p, seed) * 1.5), vec3(0.0));
}

// Non-linear transforms used below
vec3 q(vec3 v)
{
    return pow(v, vec3(1.0, 1.0, 3.5));
}

vec3 r(vec3 n)
{
    return pow(n, vec3(6.0, 9.0, 9.0));
}

// Typical complex noise, but non-linear, using values and transforms above,
// as well as masking octaves by previous ones, and using different factors
vec3 cnoise(vec3 p)
{
	vec3 n0 = n(p * 1.0, uvec3(0xa7886e74u, 0x4433f369u, 0x5842edddu));
    vec3 n1 = n(p * 2.0, uvec3(0x41a2b27au, 0x14dede03u, 0x509a02aau));
    vec3 n2 = n(p * 4.0, uvec3(0xd5bf21b3u, 0x1d6adb70u, 0xc47ed64cu));
    vec3 n3 = n(p * 8.0, uvec3(0x7279fef1u, 0x120a704eu, 0x845b7178u));
    vec3 n4 = n(p * 16.0, uvec3(0xace62131u, 0x7e861b25u, 0x9f51d60cu));
    return (
        n1 * r(n0) * 0.25 +
        q(n0) * r(n1) * vec3(0.25, 0.25, 0.5) +
        q(n0 * n1) * r(n2) * vec3(0.125, 0.125, 0.5) +
        q(n0 * n1 * n2) * r(n3) * vec3(0.0625, 0.0625, 0.5) +
        q(n0 * n1 * n2 * n3) * r(n4) * vec3(0.03125, 0.03125, 0.5)
    ) * 1.06667;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = 2.25 * fragCoord / iResolution.y;
    float t = 0.25 * iTime + 80.0;
    vec3 n = cnoise(vec3(uv, t));

    // Add the 3 complex noise values together with different colors
    fragColor = vec4(
        vec3(0.3, 0.0, 0.0) +
        vec3(0.7, 0.2, 0.2) * n.x +
        vec3(0.1, 0.2, 0.1) * n.y +
        vec3(0.9, 0.9, 2.7) * n.z, 1.0);
}
`
}
const shade = {gridmat,gridmat2,holographic,water1,abstract,fire_clouds,portal,sun,storm,envnoise_firecloud,purple_star}
export default shade
