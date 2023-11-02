import React, { useState, useEffect } from "react"
import {
  Card,
  CardBio,
  CardsContainer,
  CardFooter,
  CardAvatar,
  CardName,
  Container,
  Logo,
  ButtonsContainer,
  ButtonIcon,
  Button,
  EmptyText,
  LogoButton,
} from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"

import api from "../../services/api"
import storage from "../../storage/storage"

import logo from "../../assets/logo.png"
import dislike from "../../assets/dislike.png"
import like from "../../assets/like.png"

export default function Main() {
  const navigation = useNavigation()
  const route = useRoute()
  const { user: userid } = route.params

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: userid },
      })

      setUsers(response.data)
    }

    loadUsers()
  }, [userid])

  async function handleLike() {
    const [user, ...rest] = users

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: userid },
    })

    setUsers(rest)
  }

  async function handleDislike() {
    const [user, ...rest] = users

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: userid },
    })

    setUsers(rest)
  }

  function handleLogout() {
    storage.delete("user")

    navigation.navigate("Login")
  }

  return (
    <Container>
      <LogoButton onPress={handleLogout}>
        <Logo source={logo} />
      </LogoButton>

      <CardsContainer>
        {users.length === 0 ? (
          <EmptyText>Finished 🙁</EmptyText>
        ) : (
          users.map((user, index) => (
            <Card key={user._id} style={{ zIndex: users.length - index }}>
              <CardAvatar source={{ uri: user.avatar }} />
              <CardFooter>
                <CardName>{user.name}</CardName>
                <CardBio numberOfLines={3}>{user.bio}</CardBio>
              </CardFooter>
            </Card>
          ))
        )}
      </CardsContainer>

      {users.length > 0 && (
        <ButtonsContainer>
          <Button
            style={{
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 2,
              shadowOffset: { height: 2, width: 0 },
            }}
            onPress={handleDislike}
          >
            <ButtonIcon source={dislike} />
          </Button>
          <Button
            style={{
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 2,
              shadowOffset: { height: 2, width: 0 },
            }}
            onPress={handleLike}
          >
            <ButtonIcon source={like} />
          </Button>
        </ButtonsContainer>
      )}
    </Container>
  )
}
