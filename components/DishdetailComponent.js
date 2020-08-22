import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Picker, Switch, Button, 
    TouchableOpacity,Modal } from 'react-native';
import {AirbnbRating,Rating} from 'react-native-ratings'
import { Card, Icon ,Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
});

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View useNativeDriver="true" animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style= {styles.rowContainer}>
                    <Icon 
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                     <Icon 
                    raised
                    reverse
                    name={'pencil'}
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => props.onToggle()}
                    />
                    </View>
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View useNativeDriver="true" animation="fadeInUp" duration={2000} delay={1000}>
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props){
        super(props)
        this.state={
            rating:null,
            author:'',
            comment:'',
            showModal:false
        }
    }



    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
           rating: null,
           author:'',
           comment: '',
           showModal:false
        })
    }

    handleComments=(dishId)=>{
        this.toggleModal()
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);

    }

    render() {


        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onToggle= {() => this.toggleModal()}
                    
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                
                        visible = {this.state.showModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                       
                          
                                    <View style={styles.formRow}>
                                        <Rating showRating fractions="{1}" startingValue="{0}" 
                                        onFinishRating={value => this.setState({ rating: value}) }
                                        />
                                    </View>
                                    <View  style={styles.formRow}>
                                        <Input
                                            onChangeText={value => this.setState({ author: value })}
                                            placeholder='Author'
                                            leftIcon={
                                                <Icon
                                                    name='person'
                                                    size={24}
                                                    color='black'
                                                />
                                            }
                                        />
                                    </View>
                                    <View style={styles.formRow}>
                                    <Input 
                                        onChangeText={value => this.setState({ comment: value })}
                                        placeholder='Comment'
                                        leftIcon={
                                            <Icon
                                                name='comment'
                                                size={24}
                                                color='black'
                                            />
                                        }
                                    />
                                </View>
                                <View style={styles.modal}>
                                    <Button
                                        color='#512DA8'
                                        title='Submit'
                                        onPress={() => { this.handleComments(dishId);} }
                                    />
                                </View>
                                <View style={styles.modal}>
                                    <Button
                                        color='#808080'
                                        title='Cancel'
                                        onPress={() => { this.toggleModal();} }
                                    />
                                </View>
                            
                       
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     },
     rowContainer: {
        flexDirection: 'row',
        justifyContent:'center'
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);