/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import React, {useEffect} from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  ActivityIndicator,
  Button,
  Text as TextNative,
} from 'react-native';
import {Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import messaging from '@react-native-firebase/messaging';
import {
  gql,
  useQuery,
  NetworkStatus,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

const MY_QUERY = gql`
  query QueryBooks {
    findAllBooks {
      id
      title
      pages
      author
      reviews {
        id
        title
        comment
      }
    }
  }
`;

const MY_LAZY_QUERY = gql`
  query QueryProduct {
    findAllProducts {
      id
      title
      isOnSale
      weight
      price
      dateCreated
    }
  }
`;
const ADD_BOOK = gql`
  mutation AddBook {
    addBook(book: {title: "Lord of the11 Ring", pages: 1999, author: "Adam"}) {
      id
      title
      pages
    }
  }
`;
// const ADD_BOOK_WITH_PARAM = gql`
// mutation addBookWithParam(){

// }`;

const baseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';
const URL = baseUrl + ':8080/api/push/notifications/';
const getToken = () => {
  return new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then(token => {
        resolve(token);
      })
      .catch(error => console.log(error));
  });
};
const HomeScreen = (): JSX.Element => {
  // const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const visible: boolean = useSelector(
    (state: RootState) => state.homeReducer.isUploading,
  );
  const [addBook, {data, loading, error}] = useMutation(ADD_BOOK);

  // const {loading, error, data, networkStatus, refetch} = useQuery(MY_QUERY, {
  //   variables: {visible},
  // //pollInterval: 500,
  //   notifyOnNetworkStatusChange: true,
  //   fetchPolicy: 'network-only',
  //   nextFetchPolicy: 'cache-first',
  // });
  // const [getProduct, {loading, error, data}] = useLazyQuery(MY_LAZY_QUERY);
  const pushNotification = async () => {
    const token = await getToken();
    axios({
      method: 'GET',
      url: URL + token,
    })
      .then(() => {
        console.log(1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // client
    //   .query({
    //     query: gql`
    //       query QueryBooks {
    //         findAllBooks {
    //           id
    //           title
    //           pages
    //           author
    //           reviews {
    //             id
    //             title
    //             comment
    //           }
    //         }
    //       }
    //     `,
    //   })
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));
    if (typeof data === 'object') {
      console.log(data);
    }
  }, [loading]);
  return (
    <View>
      <Text>Home</Text>
      {loading && <ActivityIndicator size="large" color="yellow" />}
      <TouchableOpacity onPress={() => addBook()}>
        <TextNative>Get Product</TextNative>
      </TouchableOpacity>
    </View>
  );
};
// const {toggleColorMode} = useColorMode();
// const text = useColorModeValue('Light', 'Dark');
// const bg = useColorModeValue('warmGray.50', 'coolGray.800');
// return (
//   <View style={styles.container}>
//     <View style={styles.header}>
//       {/* FORK */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'FORK',
//           });
//         }}>
//         <Text style={styles.textBtn}>Fork</Text>
//       </TouchableOpacity>
//       {/* RACE */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'RACE',
//           });
//         }}>
//         <Text style={styles.textBtn}>Race</Text>
//       </TouchableOpacity>
//       {/*  CREATE CHANNEL */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'CREATE_CHANNEL',
//           });
//         }}>
//         <Text style={styles.textBtn}>Create Channel</Text>
//       </TouchableOpacity>
//       {/* REQUEST 1 & 2*/}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'REQUEST',
//             payload: {message: 'Request 1'},
//           });
//         }}>
//         <Text style={styles.textBtn}>Request 1</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'REQUEST',
//             payload: {message: 'Request 2'},
//           });
//         }}>
//         <Text style={styles.textBtn}>Request 2</Text>
//       </TouchableOpacity>
//       {/* MULTICAST CHANNEL */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'MULTICAST_CHANNEL',
//           });
//         }}>
//         <Text style={styles.textBtn}>Multicast Channel</Text>
//       </TouchableOpacity>
//       {/* UPLOAD */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           dispatch({
//             type: 'UPLOAD',
//             payload: {message: 'UPLOAD'},
//           });
//         }}>
//         <Text style={styles.textBtn}>Upload</Text>
//       </TouchableOpacity>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={visible}
//         onRequestClose={() => {
//           // setVisible(false);
//         }}>
//         <View style={styles.modal}>
//           <View style={styles.viewModal}>
//             <ActivityIndicator size={'large'} color="yellow" />
//             <TouchableOpacity
//               style={styles.btnUpload}
//               onPress={() => {
//                 // setVisible(false);
//                 dispatch({
//                   type: 'CANCEL',
//                   payload: {message: 'CANCEL'},
//                 });
//               }}>
//               <Text style={styles.textBtn}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   </View>
// );

// return (
//   <View>
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => {
//         pushNotification();
//       }}>
//       <Text style={styles.textBtn}>Push notification</Text>
//     </TouchableOpacity>
//   </View>
// );
// const myRef = React.useRef();
// const [bg, setBg] = React.useState('#fa000050');
// React.useEffect(() => {
//   const styleObj = {
//     backgroundColor: bg,
//   };

//   if (Platform.OS !== 'web') {
//     // @ts-ignore
//     myRef.current.setNativeProps({
//       style: styleObj,
//     });
//   } else {
//     // @ts-ignore
//     myRef.current.setNativeProps({
//       style: styleObj,
//     });
//   }
// }, [myRef, bg]);
// return (
//   <Box alignItems="flex-start">
//     <Checkbox
//       value="success"
//       colorScheme="success"
//       icon={
//         <Icon as={MaterialCommunityIcons} name="bullseye" opacity={0.8} />
//       }
//       wrapperRef={myRef}
//       onChange={state => {
//         if (state) {
//           setBg('#00de0050');
//         } else {
//           setBg('#fa000050');
//         }
//       }}>
//       Archery
//     </Checkbox>
//     <Stack space={4} w="75%" maxW="300px" mx="auto">
//       <Input variant="outline" placeholder="Outline" />
//       <Input variant="filled" placeholder="Filled" />
//       <Input variant="underlined" placeholder="Underlined" />
//       <Input variant="unstyled" placeholder="Unstyled" />
//       <Input variant="rounded" placeholder="Round" />
//     </Stack>
//     <Stack alignItems="center">
//       <InputGroup
//         w={{
//           base: '70%',
//           md: '285',
//         }}>
//         <InputLeftAddon children={'https://'} />
//         <Input
//           w={{
//             base: '70%',
//             md: '100%',
//           }}
//           placeholder="nativebase"
//         />
//         <InputRightAddon children={'.io'} />
//       </InputGroup>
//     </Stack>
//     {/* <Link href="https://nativebase.io" isExternal>
//       <Box
//         w={[64, 96]}
//         borderWidth="1"
//         borderColor="coolGray.300"
//         shadow="3"
//         bg="coolGray.100"
//         p="5"
//         rounded="8">
//         <HStack alignItems="center">
//           <Badge
//             colorScheme="darkBlue"
//             _text={{
//               color: 'white',
//             }}
//             variant="solid"
//             rounded="4">
//             Open Source
//           </Badge>
//           <Spacer />
//           <Text fontSize={10} color="coolGray.800">
//             2020
//           </Text>
//         </HStack>
//         <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
//           NativeBase v3
//         </Text>
//         <Text mt="2" fontSize="sm" color="coolGray.700">
//           NativeBase is a component library that enables devs to build
//           universal design systems.
//         </Text>
//         <Flex>
//           <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
//             Read More
//           </Text>
//         </Flex>
//       </Box>
//     </Link> */}
//     {/* <Radio.Group
//       defaultValue="1"
//       size="lg"
//       name="exampleGroup"
//       accessibilityLabel="pick a choice">
//       <Radio
//         _text={{
//           mx: 2,
//         }}
//         colorScheme="green"
//         value="1"
//         icon={<Icon as={<MaterialCommunityIcons name="alien" />} />}
//         my={1}>
//         Alien
//       </Radio>
//       <Radio
//         _text={{
//           mx: 2,
//         }}
//         colorScheme="red"
//         value="2"
//         icon={<Icon as={<MaterialCommunityIcons name="fire" />} />}
//         my={1}>
//         Fire
//       </Radio>
//       <Radio
//         colorScheme="warning"
//         _text={{
//           mx: 2,
//         }}
//         value="3"
//         icon={<Icon as={<MaterialCommunityIcons name="exclamation" />} />}
//         my={1}>
//         Warning
//       </Radio>
//     </Radio.Group> */}
//     <Center w="350">
//       <VStack
//         w="90%"
//         maxW="400"
//         borderWidth="1"
//         space={8}
//         overflow="hidden"
//         rounded="md"
//         _dark={{
//           borderColor: 'coolGray.500',
//         }}
//         _light={{
//           borderColor: 'coolGray.200',
//         }}>
//         <Skeleton h="40" />
//         <Skeleton.Text px="4" />
//         <Skeleton px="4" my="4" rounded="md" startColor="primary.300" />
//       </VStack>
//     </Center>
//   </Box>
// );
// const [isLoaded, setIsLoaded] = useState(false);
// const [text, setText] = useState('');
// setTimeout(() => {
//   setIsLoaded(false);
//   setText(
//     'Lose yourself in the greens of nature, the ones that make you strong. Come visit us at the Greenway Park, and we will be happy to show you around.',
//   );
// }, 5000);
// return (
//   <Center w="100%">
//     <Box w="90%" maxWidth="400">
//       <VStack
//         maxWidth="400"
//         borderWidth="1"
//         space={8}
//         overflow="hidden"
//         rounded="md"
//         _dark={{
//           borderColor: 'coolGray.500',
//         }}
//         _light={{
//           borderColor: 'coolGray.200',
//         }}>
//         <Skeleton h="40" isLoaded={isLoaded}>
//           <Image
//             h="40"
//             source={{
//               uri: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
//             }}
//           />
//         </Skeleton>
//         <Skeleton.Text lines={4} px="4" isLoaded={isLoaded}>
//           <Text color="yellow.500" px="4" fontSize={'md'} lineHeight={'20px'}>
//             {text}
//           </Text>
//         </Skeleton.Text>
//         <Skeleton
//           px="4"
//           mb="4"
//           rounded="md"
//           startColor="primary.100"
//           isLoaded={isLoaded}>
//           <Button m="4">Explore</Button>
//         </Skeleton>
//       </VStack>
//     </Box>
//   </Center>
// );
// const toast = useToast();
// return (
//   <Center>
//     <VStack space={2}>
//       <Button
//         onPress={() =>
//           toast.show({
//             title: 'Hello world',
//             placement: 'bottom',
//           })
//         }>
//         Bottom
//       </Button>

//       <Button
//         onPress={() =>
//           toast.show({
//             title: 'Hello world',
//             placement: 'top',
//           })
//         }>
//         Top
//       </Button>

//       <Button
//         onPress={() =>
//           toast.show({
//             title: 'Hello world',
//             placement: 'top-left',
//           })
//         }>
//         Top left
//       </Button>

//       <Button
//         onPress={() =>
//           toast.show({
//             title: 'Hello world',
//             placement: 'top-right',
//           })
//         }>
//         Top right
//       </Button>

//       <Button
//         onPress={() =>
//           toast.show({
//             title: 'Hello world',
//             placement: 'bottom-left',
//           })
//         }>
//         Bottom left
//       </Button>

//       <Button
//         onPress={() =>
//           toast.show({
//             title: 'Hello world',
//             placement: 'bottom-right',
//           })
//         }>
//         Bottom right
//       </Button>
//     </VStack>
//   </Center>
// );
// const [isOpen, setIsOpen] = React.useState(false);

// const onClose = () => setIsOpen(false);
// const onCancel = () => {
//   console.log('cancel');
//   onClose();
// };
// const onDelete = () => {
//   console.log('delete');
//   onClose();
// };
// const cancelRef = React.useRef(null);
// return (
//   <Center>
//     <Button colorScheme="rose" onPress={() => setIsOpen(!isOpen)}>
//       Delete Customer
//     </Button>
//     <AlertDialog
//       leastDestructiveRef={cancelRef}
//       isOpen={isOpen}
//       onClose={onClose}>
//       <AlertDialog.Content>
//         <AlertDialog.CloseButton />
//         <AlertDialog.Header>Delete Customer</AlertDialog.Header>
//         <AlertDialog.Body>
//           This will remove all data relating to Alex. This action cannot be
//           reversed. Deleted data can not be recovered.
//         </AlertDialog.Body>
//         <AlertDialog.Footer>
//           <Button.Group space={2}>
//             <Button
//               variant="unstyled"
//               colorScheme="coolGray"
//               onPress={onCancel}
//               ref={cancelRef}>
//               Cancel
//             </Button>
//             <Button colorScheme="rose" onPress={onDelete}>
//               Delete
//             </Button>
//           </Button.Group>
//         </AlertDialog.Footer>
//       </AlertDialog.Content>
//     </AlertDialog>
//   </Center>
// );
// const [showModal, setShowModal] = useState(false);
// const [showModal2, setShowModal2] = useState(false);
// const [showModal3, setShowModal3] = useState(false);
// return (
//   <Center>
//     <Button onPress={() => setShowModal(true)}>Button</Button>
//     <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
//       <Modal.Content maxWidth="350">
//         <Modal.CloseButton />
//         <Modal.Header>Order</Modal.Header>
//         <Modal.Body>
//           <VStack space={3}>
//             <HStack alignItems="center" justifyContent="space-between">
//               <Text fontWeight="medium">Sub Total</Text>
//               <Text color="blueGray.400">$298.77</Text>
//             </HStack>
//             <HStack alignItems="center" justifyContent="space-between">
//               <Text fontWeight="medium">Tax</Text>
//               <Text color="blueGray.400">$38.84</Text>
//             </HStack>
//             <HStack alignItems="center" justifyContent="space-between">
//               <Text fontWeight="medium">Total Amount</Text>
//               <Text color="green.500">$337.61</Text>
//             </HStack>
//           </VStack>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             flex="1"
//             onPress={() => {
//               setShowModal2(true);
//             }}>
//             Continue
//           </Button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal>

//     <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
//       <Modal.Content maxWidth="350">
//         <Modal.CloseButton />
//         <Modal.Header>Select Address</Modal.Header>
//         <Modal.Body>
//           <Radio.Group defaultValue="address1" name="address" size="sm">
//             <VStack space={3}>
//               <Radio
//                 alignItems="flex-start"
//                 _text={{
//                   mt: '-1',
//                   ml: '2',
//                   fontSize: 'sm',
//                 }}
//                 value="address1">
//                 4140 Parker Rd. Allentown, New Mexico 31134
//               </Radio>
//               <Radio
//                 alignItems="flex-start"
//                 _text={{
//                   mt: '-1',
//                   ml: '2',
//                   fontSize: 'sm',
//                 }}
//                 value="address2">
//                 6391 Elign St. Celina, Delaware 10299
//               </Radio>
//             </VStack>
//           </Radio.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             flex="1"
//             onPress={() => {
//               setShowModal3(true);
//             }}>
//             Continue
//           </Button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal>

//     <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
//       <Modal.Content maxWidth="350">
//         <Modal.CloseButton />
//         <Modal.Header>Payment Options</Modal.Header>
//         <Modal.Body>
//           <Radio.Group name="payment" size="sm">
//             <VStack space={3}>
//               <Radio
//                 alignItems="flex-start"
//                 _text={{
//                   mt: '-1',
//                   ml: '2',
//                   fontSize: 'sm',
//                 }}
//                 value="payment1">
//                 Cash on delivery
//               </Radio>
//               <Radio
//                 alignItems="flex-start"
//                 _text={{
//                   mt: '-1',
//                   ml: '2',
//                   fontSize: 'sm',
//                 }}
//                 value="payment2">
//                 Credit/ Debit/ ATM Card
//               </Radio>
//               <Radio
//                 alignItems="flex-start"
//                 _text={{
//                   mt: '-1',
//                   ml: '2',
//                   fontSize: 'sm',
//                 }}
//                 value="payment3">
//                 UPI
//               </Radio>
//             </VStack>
//           </Radio.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             flex="1"
//             onPress={() => {
//               setShowModal(false);
//               setShowModal2(false);
//               setShowModal3(false);
//             }}>
//             Checkout
//           </Button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal>
//   </Center>
// );
// const {isOpen, onToggle} = useDisclose();
// return (
//   <Center>
//     <Box alignItems="center" minH="220">
//       <Stagger
//         visible={isOpen}
//         initial={{
//           opacity: 0,
//           scale: 0,
//           translateY: 34,
//         }}
//         animate={{
//           translateY: 0,
//           scale: 1,
//           opacity: 1,
//           transition: {
//             type: 'spring',
//             mass: 0.8,
//             stagger: {
//               offset: 30,
//               reverse: true,
//             },
//           },
//         }}
//         exit={{
//           translateY: 34,
//           scale: 0.5,
//           opacity: 0,
//           transition: {
//             duration: 100,
//             stagger: {
//               offset: 30,
//               reverse: true,
//             },
//           },
//         }}>
//         <IconButton
//           mb="4"
//           variant="solid"
//           bg="indigo.500"
//           colorScheme="indigo"
//           borderRadius="full"
//           icon={
//             <Icon
//               as={MaterialCommunityIcons}
//               size="6"
//               name="location-exit"
//               _dark={{
//                 color: 'warmGray.50',
//               }}
//               color="warmGray.50"
//             />
//           }
//         />
//         <IconButton
//           onPress={() => console.log('microphone')}
//           mb="4"
//           variant="solid"
//           bg="yellow.400"
//           colorScheme="yellow"
//           borderRadius="full"
//           icon={
//             <Icon
//               as={MaterialCommunityIcons}
//               _dark={{
//                 color: 'warmGray.50',
//               }}
//               size="6"
//               name="microphone"
//               color="warmGray.50"
//             />
//           }
//         />
//         <IconButton
//           mb="4"
//           variant="solid"
//           bg="teal.400"
//           colorScheme="teal"
//           borderRadius="full"
//           icon={
//             <Icon
//               as={MaterialCommunityIcons}
//               _dark={{
//                 color: 'warmGray.50',
//               }}
//               size="6"
//               name="video"
//               color="warmGray.50"
//             />
//           }
//         />
//         <IconButton
//           mb="4"
//           variant="solid"
//           bg="red.500"
//           colorScheme="red"
//           borderRadius="full"
//           icon={
//             <Icon
//               as={MaterialCommunityIcons}
//               size="6"
//               name="image"
//               _dark={{
//                 color: 'warmGray.50',
//               }}
//               color="warmGray.50"
//             />
//           }
//         />
//       </Stagger>
//     </Box>
//     <HStack alignItems="center">
//       <IconButton
//         variant="solid"
//         borderRadius="full"
//         size="lg"
//         onPress={onToggle}
//         bg="cyan.400"
//         icon={
//           <Icon
//             as={MaterialCommunityIcons}
//             size="6"
//             name="dots-horizontal"
//             color="warmGray.50"
//             _dark={{
//               color: 'warmGray.50',
//             }}
//           />
//         }
//       />
//     </HStack>
//   </Center>
// );
// const {toggleColorMode} = useColorMode();
// return (
//   <Center>
//     <Button
//       colorScheme="coolGray"
//       _light={{
//         _text: {
//           color: 'white',
//         },
//       }}
//       onPress={() => {
//         toggleColorMode();
//       }}>
//       Change mode
//     </Button>
//     <Hidden colorMode="dark">
//       <Center mt="5">
//         <Image
//           w="150"
//           h="150"
//           source={{
//             uri: 'https://images.unsplash.com/photo-1561566482-5fa7e82d88b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
//           }}
//           alt="image"
//         />
//       </Center>
//     </Hidden>
//     <Hidden colorMode="light">
//       <Center mt="5">
//         <Image
//           w="150"
//           h="150"
//           source={{
//             uri: 'https://images.unsplash.com/photo-1590083948603-b270aff24cc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
//           }}
//           alt="image"
//         />
//       </Center>
//     </Hidden>
//   </Center>
// );
// const {colors} = useTheme();
// return (
//   <ScrollView w={['200', '300']} h="80">
//     <Center mt="3" mb="4">
//       <Heading fontSize="xl">Cyan</Heading>
//     </Center>
//     <VStack flex="1">
//       {Object.keys(colors.cyan).map((key, index) => {
//         if (index >= 1 && index <= 5) {
//           return (
//             <Center py="4" bg={`cyan.${key}`}>
//               {key}
//             </Center>
//           );
//         }
//       })}
//     </VStack>
//     <Center mt="8" mb="4">
//       <Heading fontSize="xl">Yellow</Heading>
//     </Center>
//     <VStack flex="1">
//       {Object.keys(colors.cyan).map((key, index) => {
//         if (index >= 1 && index <= 5) {
//           return (
//             <Center py="4" bg={`yellow.${key}`}>
//               {key}
//             </Center>
//           );
//         }
//       })}
//     </VStack>
//     <Center mt="8" mb="4">
//       <Heading fontSize="xl"> Violet</Heading>
//     </Center>
//     <VStack flex="1">
//       {Object.keys(colors.violet).map((key, index) => {
//         if (index >= 1 && index <= 5) {
//           return (
//             <Center py="4" bg={`violet.${key}`}>
//               {key}
//             </Center>
//           );
//         }
//       })}
//     </VStack>
//   </ScrollView>
// );
// const {isOpen, onOpen, onClose} = useDisclose();
// console.log(isOpen);
// return (
//   <Center>
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <Modal.Content>
//         <Modal.CloseButton />
//         <Modal.Header fontSize="4xl" fontWeight="bold">
//           Delete Customer
//         </Modal.Header>
//         <Modal.Body>
//           This will remove all data relating to Alex. This action cannot be
//           reversed. Deleted data can not be recovered.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="unstyled" mr="1" onPress={onClose}>
//             Cancel
//           </Button>
//           <Button colorScheme="error" onPress={onClose}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal>
//     <Button onPress={onOpen}>Open Modal</Button>
//   </Center>
// );
// const flexDir = useBreakpointValue({
//   base: 'column',
//   lg: 'row',
// });
// return (
//   <ScrollView showsVerticalScrollIndicator={false}>
//     <VStack py="8" space={8} alignItems="center" justifyContent="center">
//       <Heading>Why us?</Heading>
//       <View
//         style={{
//           flexDirection: flexDir,
//         }}>
//         <VStack
//           m="3"
//           w="140"
//           borderRadius="xl"
//           p="3"
//           bg="cyan.200"
//           space={2}
//           alignItems="center"
//           justifyContent="center">
//           <Icon
//             as={MaterialCommunityIcons}
//             name="shield"
//             size="sm"
//             textAlign="center"
//             _dark={{
//               color: 'coolGray.800',
//             }}
//           />
//           <Text
//             fontSize="lg"
//             textAlign="center"
//             _dark={{
//               color: 'coolGray.800',
//             }}>
//             Secure Checkout
//           </Text>
//         </VStack>
//         <VStack
//           m="3"
//           w="140"
//           borderRadius="xl"
//           p="3"
//           bg="cyan.200"
//           space={2}
//           alignItems="center"
//           justifyContent="center">
//           <Icon
//             as={MaterialCommunityIcons}
//             name="shield"
//             size="sm"
//             textAlign="center"
//             _dark={{
//               color: 'coolGray.800',
//             }}
//           />
//           <Text
//             fontSize="lg"
//             textAlign="center"
//             _dark={{
//               color: 'coolGray.800',
//             }}>
//             Secure Checkout
//           </Text>
//         </VStack>
//         <VStack
//           m="3"
//           w="140"
//           borderRadius="xl"
//           p="3"
//           bg="cyan.200"
//           space={2}
//           alignItems="center"
//           justifyContent="center">
//           <Icon
//             as={MaterialCommunityIcons}
//             name="clock"
//             size="sm"
//             textAlign="center"
//             _dark={{
//               color: 'coolGray.800',
//             }}
//           />
//           <Text
//             fontSize="lg"
//             textAlign="center"
//             _dark={{
//               color: 'coolGray.800',
//             }}>
//             Fast Turn Around
//           </Text>
//         </VStack>
//       </View>
//     </VStack>
//   </ScrollView>
// );
// return <AppBar />;
// const [index, setIndex] = React.useState(0);
// const [routes] = React.useState([
//   {
//     key: 'first',
//     title: 'Tab 1',
//   },
//   {
//     key: 'second',
//     title: 'Tab 2',
//   },
//   {
//     key: 'third',
//     title: 'Tab 3',
//   },
//   {
//     key: 'fourth',
//     title: 'Tab 4',
//   },
// ]);

// const renderTabBar = props => {
//   const inputRange = props.navigationState.routes.map((x, i) => i);
//   return (
//     <Box flexDirection="row">
//       {props.navigationState.routes.map((route, i) => {
//         const opacity = props.position.interpolate({
//           inputRange,
//           outputRange: inputRange.map(inputIndex =>
//             inputIndex === i ? 1 : 0.5,
//           ),
//         });
//         const color =
//           index === i
//             ? useColorModeValue('#000', '#e5e5e5')
//             : useColorModeValue('#1f2937', '#a1a1aa');
//         const borderColor =
//           index === i
//             ? 'cyan.500'
//             : useColorModeValue('coolGray.200', 'gray.400');
//         return (
//           <Box
//             borderBottomWidth="3"
//             borderColor={borderColor}
//             flex={1}
//             alignItems="center"
//             p="3"
//             cursor="pointer">
//             <Pressable
//               onPress={() => {
//                 console.log(i);
//                 setIndex(i);
//               }}>
//               <Animated.Text
//                 style={{
//                   color,
//                 }}>
//                 {route.title}
//               </Animated.Text>
//             </Pressable>
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// return (
//   <TabView
//     navigationState={{
//       index,
//       routes,
//     }}
//     renderScene={renderScene}
//     renderTabBar={renderTabBar}
//     onIndexChange={setIndex}
//     initialLayout={initialLayout}
//     style={{
//       marginTop: StatusBar.currentHeight,
//     }}
//   />
// );
// const [formData, setData] = React.useState({});
// return (
//   <FormControl isRequired>
//     <FormControl.Label
//       _text={{
//         bold: true,
//       }}>
//       Name
//     </FormControl.Label>
//     <Input
//       placeholder="John"
//       onChangeText={value => setData({...formData, name: value})}
//     />
//     <FormControl.HelperText
//       _text={{
//         fontSize: 'xs',
//       }}>
//       Name should contain atleast 3 character.
//     </FormControl.HelperText>
//     <FormControl.ErrorMessage
//       _text={{
//         fontSize: 'xs',
//       }}>
//       Error Name
//     </FormControl.ErrorMessage>
//   </FormControl>
// );

// function Basic() {
//   const data = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       fullName: 'Afreen Khan',
//       timeStamp: '12:47 PM',
//       recentText: 'Good Day!',
//       avatarUrl:
//         'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       fullName: 'Sujita Mathur',
//       timeStamp: '11:11 PM',
//       recentText: 'Cheer up, there!',
//       avatarUrl:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       fullName: 'Anci Barroco',
//       timeStamp: '6:22 PM',
//       recentText: 'Good Day!',
//       avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
//     },
//     {
//       id: '68694a0f-3da1-431f-bd56-142371e29d72',
//       fullName: 'Aniket Kumar',
//       timeStamp: '8:56 PM',
//       recentText: 'All the best',
//       avatarUrl:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
//     },
//     {
//       id: '28694a0f-3da1-471f-bd96-142456e29d72',
//       fullName: 'Kiara',
//       timeStamp: '12:47 PM',
//       recentText: 'I will call today.',
//       avatarUrl:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
//     },
//   ];
//   const [listData, setListData] = useState(data);

//   const closeRow = (rowMap, rowKey) => {
//     if (rowMap[rowKey]) {
//       rowMap[rowKey].closeRow();
//     }
//   };

//   const deleteRow = (rowMap, rowKey) => {
//     closeRow(rowMap, rowKey);
//     const newData = [...listData];
//     const prevIndex = listData.findIndex(item => item.key === rowKey);
//     newData.splice(prevIndex, 1);
//     setListData(newData);
//   };

//   const onRowDidOpen = rowKey => {
//     console.log('This row opened', rowKey);
//   };

//   const renderItem = ({item, index}) => (
//     <Box>
//       <Pressable
//         onPress={() => console.log('You touched me')}
//         _dark={{
//           bg: 'coolGray.800',
//         }}
//         _light={{
//           bg: 'white',
//         }}>
//         <Box pl="4" pr="5" py="2">
//           <HStack alignItems="center" space={3}>
//             <Avatar
//               size="48px"
//               source={{
//                 uri: item.avatarUrl,
//               }}
//             />
//             <VStack>
//               <Text
//                 color="coolGray.800"
//                 _dark={{
//                   color: 'warmGray.50',
//                 }}
//                 bold>
//                 {item.fullName}
//               </Text>
//               <Text
//                 color="coolGray.600"
//                 _dark={{
//                   color: 'warmGray.200',
//                 }}>
//                 {item.recentText}
//               </Text>
//             </VStack>
//             <Spacer />
//             <Text
//               fontSize="xs"
//               color="coolGray.800"
//               _dark={{
//                 color: 'warmGray.50',
//               }}
//               alignSelf="flex-start">
//               {item.timeStamp}
//             </Text>
//           </HStack>
//         </Box>
//       </Pressable>
//     </Box>
//   );

//   const renderHiddenItem = (data, rowMap) => (
//     <HStack flex="1" pl="2">
//       <Pressable
//         w="70"
//         ml="auto"
//         cursor="pointer"
//         bg="coolGray.200"
//         justifyContent="center"
//         onPress={() => closeRow(rowMap, data.item.key)}
//         _pressed={{
//           opacity: 0.5,
//         }}>
//         <VStack alignItems="center" space={2}>
//           <Icon
//             as={<Entypo name="dots-three-horizontal" />}
//             size="xs"
//             color="coolGray.800"
//           />
//           <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
//             More
//           </Text>
//         </VStack>
//       </Pressable>
//       <Pressable
//         w="70"
//         cursor="pointer"
//         bg="red.500"
//         justifyContent="center"
//         onPress={() => deleteRow(rowMap, data.item.key)}
//         _pressed={{
//           opacity: 0.5,
//         }}>
//         <VStack alignItems="center" space={2}>
//           <Icon
//             as={<MaterialCommunityIcons name="delete" />}
//             color="white"
//             size="xs"
//           />
//           <Text color="white" fontSize="xs" fontWeight="medium">
//             Delete
//           </Text>
//         </VStack>
//       </Pressable>
//     </HStack>
//   );

//   return (
//     <Box bg="white" safeArea flex="1">
//       <SwipeListView
//         data={listData}
//         renderItem={renderItem}
//         renderHiddenItem={renderHiddenItem}
//         rightOpenValue={-130}
//         previewRowKey={'0'}
//         previewOpenValue={-40}
//         previewOpenDelay={3000}
//         onRowDidOpen={onRowDidOpen}
//       />
//     </Box>
//   );
// }
// const FirstRoute = () => (
//   <Center flex={1} my="4">
//     This is Tab 1
//   </Center>
// );

// const SecondRoute = () => (
//   <Center flex={1} my="4">
//     This is Tab 2
//   </Center>
// );

// const ThirdRoute = () => (
//   <Center flex={1} my="4">
//     This is Tab 3
//   </Center>
// );

// const FourthRoute = () => (
//   <Center flex={1} my="4">
//     This is Tab 4{' '}
//   </Center>
// );

// const initialLayout = {
//   width: Dimensions.get('window').width,
// };
// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
//   fourth: FourthRoute,
// });

// const AppBar = () => {
//   return (
//     <>
//       <StatusBar bg="#3700B3" barStyle="light-content" />
//       <Box safeAreaTop bg="violet.600" />
//       <HStack
//         bg="violet.800"
//         px="1"
//         py="3"
//         justifyContent="space-between"
//         alignItems="center"
//         w="100%"
//         maxW="350">
//         <HStack alignItems="center">
//           <IconButton
//             icon={
//               <Icon
//                 size="sm"
//                 as={MaterialCommunityIcons}
//                 name="menu"
//                 color="white"
//               />
//             }
//           />
//           <Text color="white" fontSize="20" fontWeight="bold">
//             Home
//           </Text>
//         </HStack>
//         <HStack>
//           <IconButton
//             icon={
//               <Icon
//                 as={MaterialCommunityIcons}
//                 name="favorite"
//                 size="sm"
//                 color="white"
//               />
//             }
//           />
//           <IconButton
//             icon={
//               <Icon
//                 as={MaterialCommunityIcons}
//                 name="search"
//                 size="sm"
//                 color="white"
//               />
//             }
//           />
//           <IconButton
//             icon={
//               <Icon
//                 as={MaterialCommunityIcons}
//                 name="more-vert"
//                 size="sm"
//                 color="white"
//               />
//             }
//           />
//         </HStack>
//       </HStack>
//     </>
//   );
// };
// function AppDrawer() {
// const icons = [
//   {
//     name: 'bolt',
//     bg: 'amber.600',
//   },
//   {
//     name: 'house',
//     bg: 'emerald.600',
//   },
//   {
//     name: 'cloud',
//     bg: 'blue.600',
//   },
//   {
//     name: 'motorbike',
//     bg: 'orange.600',
//   },
//   {
//     name: 'heart',
//     bg: 'rose.600',
//   },
//   {
//     name: 'music-note',
//     bg: 'violet.600',
//   },
//   {
//     name: 'invert-colors-on',
//     bg: 'lime.600',
//   },
//   {
//     name: 'navigation',
//     bg: 'indigo.600',
//   },
//   {
//     name: 'custom',
//     bg: 'pink.600',
//   },
//   {
//     name: 'gamepad',
//     bg: 'coolGray.600',
//   },
//   {
//     name: 'shield',
//     bg: 'darkBlue.600',
//   },
//   {
//     name: 'camera',
//     bg: 'fuchsia.600',
//   },
//   {
//     name: 'wifi',
//     bg: 'amber.500',
//   },
//   {
//     name: 'moon',
//     bg: 'violet.800',
//   },
//   {
//     name: 'airplane',
//     bg: 'blue.800',
//   },
//   {
//     name: 'extension',
//     bg: 'indigo.600',
//   },
//   {
//     name: 'duo',
//     bg: 'orange.600',
//   },
//   {
//     name: 'image',
//     bg: 'rose.600',
//   },
//   {
//     name: 'alarm',
//     bg: 'emerald.600',
//   },
//   {
//     name: 'forum',
//     bg: 'indigo.600',
//   },
// ];
// return (
//   <FlatList
//     numColumns={4}
//     m={'-8px'}
//     data={icons}
//     renderItem={({item}) => {
//       return (
//         <IconButton
//           m={'8px'}
//           borderRadius="full"
//           bg={item.bg}
//           variant="solid"
//           p="3"
//           icon={
//             <Icon
//               color="white"
//               name={item.name}
//               as={MaterialCommunityIcons}
//               size="sm"
//             />
//           }
//         />
//       );
//     }}
//   />
// );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: width,
    height: height,
    // position: 'absolute',
    // left: width / 4,
    // bottom: height / 2.5,
    // width: '50%',
    // height: '15%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    borderBottomColor: 'gray',
    border: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModal: {
    width: 200,
    height: 150,
    backgroundColor: 'rgb(0,255,255)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 50,
    marginBottom: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textBtn: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  btnUpload: {
    width: 100,
    height: 50,
    marginTop: 10,
    backgroundColor: 'teal',
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
