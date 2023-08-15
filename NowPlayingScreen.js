import { FlatList, View, ActivityIndicator, Text, Pressable, Image, ImageBackground,Platform } from "react-native"
import { useEffect, useState } from "react";
import Gauge from "./Gauge";
import Gstyles from "./Gstyle";
import Icon from '@expo/vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';

const NowPlayingScreen = ({ navigation, route }) => {
    
    const [movieList, SetmovieList] = useState()
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getMovieList()
    }, [])

    const getMovieList = async () => {
        const apiUri = `https://api.themoviedb.org/3/movie/now_playing?api_key=5b0182fba24efeeee09eee40ccc10d65&language=en-US&page=1`
        return fetch(apiUri)
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                SetmovieList(resJson.results)
            })
            .catch((error) => {
                // console.error(error);
                setLoading(false);
            })
            .finally(() => setLoading(false))
    }



    const renderListItem = ({ item }) => (

        <Pressable onPress={() => {
            navigation.navigate('Detail', { selectedItem: item })
        }}>
            <View style={Gstyles.listItemContainer}>
                <View style={Gstyles.listItemContainerLeft}>
                    <Text style={Gstyles.listtitle}> {item.original_title} </Text>
                    <ImageBackground style={Gstyles.listbg} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} resizeMode="cover" imageStyle={{ opacity: 0.4 }}>
                        <View style={Gstyles.listItem}>
                            <View style={Gstyles.leftContainer}>
                                <Image style={Gstyles.listimg} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} resizeMode="center" />
                            </View >
                            <View style={Gstyles.rightContainer}>
                                <Text style={Gstyles.listTextRating}> {'Rating'} </Text>
                                {(Platform.OS === 'ios') ? <Gauge
                                    size={75}
                                    progress={item.vote_average / 10}
                                    animated={false}
                                    alwaysUseEndAngle={true}
                                    endAngle={0}
                                    unfilledEndAngle={0.5}
                                    thickness={8}
                                    borderWidth={1}
                                    needleWidth={0}
                                    color={(item.vote_average > 8) ? 'green' : (item.vote_average > 6) ? 'blue' : 'red'}
                                    needleBorderRadius={25}
                                /> : <Text style={Gstyles.listTextReleaseDate}> {`${item.vote_average}`} </Text>}
                                
                                <Text style={Gstyles.listTextReleaseDate}> {`Release: ${item.release_date}`} </Text>

                            </View>

                            <View style={Gstyles.listseparator} />

                        </View>

                    </ImageBackground>
                </View>
                <View style={Gstyles.listItemContainerRight}>
                    <AntDesign name={'caretright'} size={30} color={'#FFDEA4'} />
                </View>

            </View>
        </Pressable>
    );

    return (
        <View style={Gstyles.container}>
            {isLoading ? (
                <ActivityIndicator animating={true} size="large" />
            ) : (

                <FlatList
                    data={movieList} 
                    keyExtractor={(item) => { return item.id }}
                    renderItem={renderListItem}
                />
            )}
        </View>

    )
}

export default NowPlayingScreen