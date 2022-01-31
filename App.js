import { SafeAreaView,Text,Button,FlatList,Image, View,StyleSheet,ActivityIndicator } from "react-native";
import { useState,useEffect } from "react";

const App = () => {

	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		
		const requestMovie = async () => {
			setLoading(true)
			const req  = await fetch('https://api.b7web.com.br/cinema/');
			const json = await req.json();
	  
		if( json ){
			setMovies( json )
		}
		setLoading(false)	
	}
		requestMovie()
	}, []);





  return(
	  <SafeAreaView style      = {styles.conatiner}>
	  
	  {loading &&
		<View style={styles.loadingArea}>
			<ActivityIndicator size="large" color="#FFF"/>
			<Text style={styles.loadingText}>Carregando...</Text>
		</View>
	  }

	  {!loading&&
	  
	  <>
	  <Text         style      = {styles.totalMoviesText}>Total de Filmes: {movies.length}</Text>
	  <FlatList     style      = {styles.list}
	                data       = {movies}
	                renderItem = {({ item })=>(
				<View style = {styles.moviesItem}>
					<Image 
						source     = {{ uri: item.avatar }}
						style      = {styles.imageItems}
						resizeMode = "contain"
					  />
					<Text style = {styles.moveTitle}>{ item.titulo }</Text>
				</View>
			  )}
			  keyExtractor = { item => item.titulo }
		  />
	  </>
	  
	  }
	  </SafeAreaView>
  )
}

export default App;



const styles = StyleSheet.create({

	conatiner:{
		flex           : 1,
		marginTop      : 30,
		backgroundColor: '#333',
	},
	totalMoviesText:{
		color       : "#FFF",
		fontSize    : 18,
		textAlign   : "center",
		marginTop   : 10,
		marginBottom: 10,
	},
	list:{
		flex: 1,
	},
	moviesItem:{
		alignItems  : "center",
		marginBottom: 30,
	},
	imageItems:{
		width : 400,
		height: 400,
	},
	moveTitle:{
		fontSize : 24,
		color    : "#fff",
		textAlign: "center",
		marginTop: 10,

	},
	loadingArea:{
		flex: 1,
		justifyContent:"center",
		alignItems:"center"
	},
	loadingText:{
		color: '#fff',
	}
})

