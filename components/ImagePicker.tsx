import { SetStateAction, useState } from "react";
import { TouchableOpacity, View, FlatList, Image, Text, StyleSheet, Dimensions } from "react-native";


// Get screen width for responsive design
const { width } = Dimensions.get('window');

// Adjust the number of columns dynamically based on screen size
const numColumns = width > 500 ? 4 : 3; // 4 columns for larger screens (tablet), 3 for smaller ones (phone)

interface ImagePickerProps {
    onImageSelect: (url: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelect }) => {
    const [photoURL, setPhotoURL] = useState(null);
  
    const imagePresets = [
      'https://tinyjpg.com/images/social/website.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIZgsflyd1YiDYZDYAti86gBy31voZnPEwA&s',
      'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
      'https://as2.ftcdn.net/jpg/01/29/21/19/1000_F_129211962_LDCLlhzn07B1I85oIfX1InIPeQtneo5q.jpg',
      'https://thumbs.dreamstime.com/b/dirty-pig-cartoon-happy-stupid-73185265.jpg'
      
    ];
  
    const handleSelectImage = (url: SetStateAction<null>) => {
      setPhotoURL(url);
      onImageSelect(url);
    };
  
    const renderItem = ({ item }: { item: string }) => {
        const isSelected = item === photoURL; // Check if the current item is selected
        return (
          <TouchableOpacity onPress={() => handleSelectImage(item)} style={isSelected ? styles.selectedImageContainer : null}>
            <Image source={{ uri: item }} style={[styles.image, isSelected && styles.selectedImage]} />
          </TouchableOpacity>
        );
      };
  
      return (
        <View style={styles.container}>
          {/* <Text style={styles.title}>Choose a Photo</Text> */}
    
          <FlatList
            data={imagePresets}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={numColumns} // Set columns dynamically based on screen width
            contentContainerStyle={styles.imageContainer}
          />
    
        {/*   {photoURL && <Text style={styles.selectedImageText}>Selected Image: {photoURL}</Text>} */}
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 90,
    },
    image: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 8,
    },
    selectedImage: {
        borderWidth: 3,
        borderColor: 'blue', // Highlight color
    },
    selectedImageContainer: {
        backgroundColor: 'rgba(0, 0, 255, 0.1)', // Light blue background for selected image
        borderRadius: 8,
    },
    selectedImageText: {
      fontSize: 16,
      color: 'gray',
    },
  });
  
  export default ImagePicker;