import React, { Component } from 'react';
import { Notifications } from "expo";
import { API, Auth } from "aws-amplify";
import { Container, Content, Form, Item, Input, Label, Button, Header } from 'native-base';
import uuidv4 from "uuid";
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Loader from "../components/Loader";


export default class CreateProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fName: "",
            name: "",
            city: "",
            region: "",
            country: "",
            tRank: "",
            cRank: "",
            github: "",
            dob: "",
            mbriggs: "",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            expoToken: "",
            loading: false

        }
    }

    async componentDidMount() {
        const notificationToken = await Notifications.getExpoPushTokenAsync();
        console.log('Notification Token: ', notificationToken)
        this.setState({ expoToken: notificationToken})
    }

    async createUser(user) {
        const body = user;
        const response = await API.post('fsa', '/users', {body})
        await console.log('User Creation Response: ', response)
    }

    async createApprenticeship(apprenticeship) {
        const body = apprenticeship;
        await console.log(JSON.stringify(body))
        const response = await API.post('fsa', '/experience', {body})
        await console.log('Apprenticeship creation response: ', response);
    }

    async createProduct(product) {
        const body = product;
        const response = await API.post('fsa', '/experience', {body});
        await console.log('Product creation response: ', response)
    }
     
      createProfile = async () => {

        
        this.setState({ loading: true })
        const id = await AsyncStorage.getItem('id')
        const productId = uuidv4();
        const apprenticeshipId = uuidv4();
        const masteryId = uuidv4();

        const user = {
            id: id,
            fName: this.state.fName,
            lName: this.state.lName,
            mentor: 'bdaad57c-2183-468a-a114-493c19327762',
            xp: 0,
            city: this.state.city,
            country: this.state.country,
            communityRank: 'Outsider',
            technicalRank: "Apprentice",
            experience: "Incomplete",
            linkedIn: "Incomplete",
            instructor: "Incomplete",
            stripe: "Incomplete",
            paypal: "Incomplete",
            github: this.state.github,
            instructor: false,
            productId: productId,
            apprenticeshipId: apprenticeshipId,
            masteryId: masteryId,
            expo: this.state.expoToken,
            createdAt: new Date(),
        }

        const apprenticeship = {
            id: apprenticeshipId,
            xp: 3000,
            xpEarned: 0,
            achievements: 0,
            memberId: id,  
            type: 'Apprenticeship',
            approved: false,
            title: 'Apprenticeship',
            description: 'The process of becoming a developer.',
            _01: false,
            _01_approved: false,
            _02: false,
            _02_approved: false,
            _03: false,
            _03_approved: false,
            _04: false,
            _04_approved: false,
            _05: false,
            _05_approved: false,
            _06: false,
            _06_approved: false,
            _07: false,
            _07_approved: false,
            _08: false,
            _08_approved: false,
            _09: false,
            _09_approved: false,
            _10: false,
            _10_approved: false,
            _11: false,
            _11_approved: false,
            _12: false,
            _12_approved: false,
            _13: false,
            _13_approved: false,
            _14: false,
            _14_approved: false,
            _15: false,
            _15_approved: false,
        }

        const product = {
            id: productId,
            xp: 2000,
            xpEarned: 0,
            achievements: 0,
            memberId: id,  
            type: 'Product',
            approved: false,
            title: 'Please give your product a name',
            description: "Please write a description of your project.",
            github: "Incomplete",
            _01: false,
            _01_approved: false,
            _02: false,
            _02_approved: false,
            _03: false,
            _03_approved: false,
            _04: false,
            _04_approved: false,
            _05: false,
            _05_approved: false,
            _06: false,
            _06_approved: false,
            _07: false,
            _07_approved: false,
            _08: false,
            _08_approved: false,
            _09: false,
            _09_approved: false,
            _10: false,
            _10_approved: false,
            _11: false,
            _11_approved: false,
            _12: false,
            _12_approved: false,
            _13: false,
            _13_approved: false,
            _14: false,
            _14_approved: false,
            _15: false,
            _15_approved: false,
        }

            try {
                await this.createUser(user);
                await this.createApprenticeship(apprenticeship);
                await this.createProduct(product);

                this.setState({ loading: false })

            } catch (e) {
                console.log('ERROR: ', e)
            }
            this.setState({
                name: "",
                city: "",
                // region: "",
                country: "",
                github: "",
           
            })
            this.props.navigation.navigate('Profile')
        }

        

    render() {
        return(
            <Container>
                <Content>
                <Loader loading={this.state.loading} />

                    <Form>
                        <Item floatingLabel>
                        <Label>First Name</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.fName}
                            onChangeText={(fName) => this.setState({fName})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Item floatingLabel>
                        
                        <Label>Last Name</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.lName}
                            onChangeText={(lName) => this.setState({lName})}
                            autoCapitalize="none"
                                />
                        </Item> 
                        <Item floatingLabel>
                        <Label>City</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.city}
                            onChangeText={(city) => this.setState({city})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Item floatingLabel>
                        <Label>Country</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.country}
                            onChangeText={(country) => this.setState({country})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Item floatingLabel>
                        <Label>GitHub Username</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.github}
                            onChangeText={(github) => this.setState({github})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Text>{`\n`}</Text>   
                    <Button full style={{backgroundColor: "#6200EE"}} onPress={this.createProfile}>
                        <Text style={{color: 'white'}}>Create Profile</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}

