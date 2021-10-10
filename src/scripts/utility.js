const Utility = {
    inherits(childClass, parentClass) {
        function Surrogate(){};
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    }






}

export default Utility;