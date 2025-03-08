<?php
class ObjectMapper {

    /**
     * Converts an object to an associative array.
     * 
     * @param object $object The object to convert
     * @return array The object as an associative array
     */
    public static function toArray($object) {
        $array = [];
        // Get all properties of the object
        $reflection = new ReflectionObject($object);
        $properties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);

        foreach ($properties as $property) {
            $property->setAccessible(true); // Allow access to private/protected properties
            $array[$property->getName()] = $property->getValue($object);
        }

        return $array;
    }

    /**
     * Converts an associative array to an object of the given class.
     * 
     * @param array $data The array to convert
     * @param object $object An instance of the class to populate
     * @return object The populated object
     */
    public static function fromArray(array $data, $object) {
        foreach ($data as $key => $value) {
            // Check if the object has the property and set it
            if (property_exists($object, $key)) {
                $object->$key = $value;
            }
        }
        return $object;
    }
}
?>
