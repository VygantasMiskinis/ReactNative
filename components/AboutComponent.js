import React, { Component } from 'react';
import { View, Text, FlatList, Alert} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {LEADERS} from '../shared/leaders';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }


    render(){
        const RenderHistory = () => {
            return(
<Card
featuredTitle="Our History">
    <Text>     
Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.

The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
    </Text>
</Card>
);
        }

        
        const renderLeader = ({leader, index}) => {
   
            return (
                    <ListItem
                        key={index}
                        title={leader.name}
                        subtitle={leader.description}
                        hideChevron={true}
                        leftAvatar={{ source: require('../shared/images/alberto.png')}}
                      />
            );
        };
        return(
            Alert.alert("leader state: " + JSON.stringify(this.state.leaders))
            <View>
                <RenderHistory/>
                <Card featuredTitle="Corporate Leadership">
                    
                    <FlatList 
                    
                    data={this.state.leaders}
                    renderItem={renderLeader}
                    keyExtractor={leader => leader.id.toString()}
                    />
                </Card>
            </View>
        );
    }
}

export default About;