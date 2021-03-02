const Utility = {};

//convert 2 dimensional array indices to single dimensional index
//returns -1 if of bounds
Utility.ConvertToSingleDimensionalIndex = (x, y, width, height) => {
    if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
        return -1;
    }
    return x + y * width;
};