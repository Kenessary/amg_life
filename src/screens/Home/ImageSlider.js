import * as React from 'react';
import { View, ScrollView, Dimensions,  Text, Image, StyleSheet } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';


const DEVICE_WIDTH = Dimensions.get('window').width

class ImageSlider extends React.Component{

    scrollRef = React.createRef()

    constructor(props){
        super(props)

        this.state = {
            selectIndex: 0
        }
    }

    componentDidMount = () => {
        setInterval(()=>{
            this.setState(prev =>({selectIndex: prev.selectIndex === this.props.images.length -1 ? 0 : prev.selectIndex + 1}),
            () => {
                this.scrollRef.current.scrollTo({
                    animated: true,
                    y: 0,
                    x: DEVICE_WIDTH * this.state.selectIndex
                })

            })
        }, 10000)
    }

    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x
        const selectIndex = Math.floor(contentOffset / viewSize)
        this.setState({selectIndex}) 
    }

    render(){

        const {images} = this.props
        const {selectIndex} = this.state
        return(
            <View style = {{height:350, width:"100%"}}>
                <ScrollView horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex} ref={this.scrollRef} showsHorizontalScrollIndicator={false}>
                    {images.map(image=> (
                        <Image
                            key={image}
                            source={{uri:image}}
                            style = {styles.backgroundImage}
                        />
                    ))}

                </ScrollView> 
                <View style={styles.circleDiv}>
                    {images.map((image, i)=> (
                        <View
                            key={image}
                            style={[styles.whiteCircle, {backgroundColor: i === selectIndex ? "#D64D43" : "#fff"}]}
                        />
                    ))}
                </View>
            </View>
        )
    }

    

};

const styles = StyleSheet.create({
    backgroundImage:{
        height: 350,
        width: DEVICE_WIDTH,
    },
    circleDiv:{
        position:'absolute',
        bottom:15,
        height:10,
        width: "100%",
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    whiteCircle:{
        width:7,
        height:7,
        borderRadius:10,
        margin:10,
        backgroundColor:'#fff'
    }
})

export {ImageSlider};
