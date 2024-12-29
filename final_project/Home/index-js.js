
var i = 0;
var images = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg','images/image4.jpg','images/image5.jpg'];

// this function for switcher automatically of image gallary
function autoSwitcher() {
    setInterval(function() {
        switchImage(incrementI());
    }, 3000); // every 3 second interval
}
// this function to switch image to another image
function switchImage(i){
    var image = document.getElementById('image');
    image.src = images[i];
}
// decrement i (left image)
function decrementI(){
    i = (i - 1 + images.length) % images.length;// decrement i and loop back to the last image when it reaches the first image
    return i;
}
// increment i (right image)
function incrementI(){
    i = (i + 1) % images.length; // increment i and loop back to 0 when it reaches the end
    return i;
}
// this function to switch the image to the left
function switchToLeft(){
    switchImage(decrementI());
}
// this function to switch the image to the right
function switchToRight(){
    switchImage(incrementI()); 
}

// when the window load autoSwitcher() function will wor
window.onload = autoSwitcher;
