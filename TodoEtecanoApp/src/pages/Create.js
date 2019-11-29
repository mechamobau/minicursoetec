import React, {Component} from 'react';

import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../components/Button';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 16,
    },
    label: {
        width: '100%',
        color: '#B12D30',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 8,
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#B12D30',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#B12D30',
    },
    photosContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    photoButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        marginRight: 15,
        borderColor: '#B12D30',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
});

export default class Create extends Component {
    static navigationOptions = {
        title: 'Criar TODO',
    };

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            date: '',
            photos: [],
            loading: false,
        };
    }

    componentDidMount = () => {
        const {
            navigation: {setParams},
        } = this.props;
        setParams({handlePhoto: this.handlePhoto});
    };

    handlePhoto = () => {
        ImagePicker.showImagePicker(
            {
                quality: 1,
                mediaType: 'photo',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
                takePhotoButtonTitle: 'Tirar foto',
                chooseWhichLibraryTitle: 'Selecionar foto',
                storageOptions: {
                    skipBackup: true,
                },
            },
            response => {
                if (!response.didCancel && !response.error) {
                    let {photos} = this.state;
                    photos.push('data:image/jpeg;base64,' + response.data);
                    this.setState({photos});
                }
            },
        );
    };

    handleCreate = async () => {
        const {title, description, date} = this.state;

        if (title !== '' && date !== '') {
            const user = await AsyncStorage.getItem('username');
            this.setState({loading: true});
            const obj = {user, title, description, date};
            try {
                const response = await api.post('/todos', obj);

                const {data} = response;

                if (!data.error) {
                    alert(data.message);
                    this.setState({title: '', description: '', date: ''});
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert(error);
            } finally {
                this.setState({loading: false});
            }
        } else {
            alert('Preencha os campos obrigatórios');
        }
    };

    removePhoto = _idx => {
        const {photos} = this.state;
        let nPhotos = photos.filter((photo, idx) => idx !== _idx);
        this.setState({photos: nPhotos});
    };

    render = () => {
        const {title, description, date, photos, loading} = this.state;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.label}>Titulo *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite aqui..."
                    value={title}
                    onChangeText={title => this.setState({title})}
                />

                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite aqui..."
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={description => this.setState({description})}
                />

                <Text style={styles.label}>Data *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite aqui..."
                    value={date}
                    onChangeText={date => this.setState({date})}
                />

                <Text style={styles.label}>Anexos</Text>
                <ScrollView
                    horizontal
                    style={styles.photosContainer}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={this.handlePhoto}
                        style={styles.photoButton}>
                        <Icon name="plus" size={30} color="#B12D30" />
                    </TouchableOpacity>

                    {photos.map((photo, idx) => (
                        <TouchableOpacity
                            key={String(idx)}
                            onPress={() => this.removePhoto(idx)}
                            style={styles.photoButton}>
                            <Image
                                source={{uri: photo}}
                                style={styles.photoImage}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Button onPress={this.handleCreate} loading={loading}>
                    Criar
                </Button>
            </ScrollView>
        );
    };
}
