import React, { useState, useEffect } from "react"
import { Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, ButtonText, Container, Input, Logo } from "./styles"

import api from "../../services/api"
import storage from "../../storage/storage"

import logo from "../../assets/logo.png"

export default function Login() {
  const navigation = useNavigation()
  const [user, setUser] = useState("")

  useEffect(() => {
    const userData = storage.getString("user")
    if (userData) {
      const { _id } = JSON.parse(userData)
      navigation.navigate("Main", { user: _id })
    }
  }, [])

  async function handleLogin() {
    try {
      const response = await api.post("/devs", { username: user })

      const { _id } = response.data

      storage.set("user", JSON.stringify({ _id }))

      navigation.navigate("Main", { user: _id })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container behavior="padding" enable={Platform.OS === "ios"}>
      <Logo source={logo} />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter you Github user"
        placeholderTextColor="#999"
        value={user}
        onChangeText={setUser}
      />

      <Button onPress={handleLogin}>
        <ButtonText>Enter</ButtonText>
      </Button>
    </Container>
  )
}
