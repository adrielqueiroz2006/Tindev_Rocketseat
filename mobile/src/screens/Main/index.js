import React, { useState, useEffect } from "react"
import io from "socket.io-client"
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
  MatchImage,
  MatchAvatar,
  MatchContainer,
  MatchName,
  MatchBio,
  MatchCloseButton,
  MatchCloseButtonText,
} from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"

import api from "../../services/api"
import storage from "../../storage/storage"

import logo from "../../assets/logo.png"
import dislike from "../../assets/dislike.png"
import like from "../../assets/like.png"
import itsamatch from "../../assets/itsamatch.png"

export default function Main() {
  const navigation = useNavigation()
  const route = useRoute()
  const { user: userid } = route.params

  const [users, setUsers] = useState([])
  const [matchDev, setMatchDev] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: userid },
      })

      setUsers(response.data)
    }

    loadUsers()
  }, [userid])

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: { user: userid },
    })

    socket.on("match", (dev) => {
      setMatchDev(dev)
    })
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

      {matchDev && (
        <MatchContainer style={{ zIndex: users.length }}>
          <MatchImage source={itsamatch} style={{ resizeMode: "contain" }} />
          <MatchAvatar
            source={{ uri: matchDev.avatar }}
            style={{ borderRadius: 80, borderWidth: 5, borderColor: "#FFF" }}
          />

          <MatchName>{matchDev.name}</MatchName>

          <MatchBio>{matchDev.bio}</MatchBio>

          <MatchCloseButton onPress={() => setMatchDev(null)}>
            <MatchCloseButtonText>CLOSE</MatchCloseButtonText>
          </MatchCloseButton>
        </MatchContainer>
      )}
    </Container>
  )
}
