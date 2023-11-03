import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: space-between;
`

export const LogoButton = styled.TouchableOpacity``

export const Logo = styled.Image`
  margin-top: 30px;
`

export const CardsContainer = styled.View`
  flex: 1;
  align-self: stretch;
  max-height: 500px;
`

export const Card = styled.View`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 30px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const CardAvatar = styled.Image`
  flex: 1;
  height: 300px;
`

export const CardFooter = styled.View`
  background-color: #fff;
  padding: 15px 20px;
`

export const CardName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`

export const CardBio = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  line-height: 18px;
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`

export const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`

export const ButtonIcon = styled.Image``

export const EmptyText = styled.Text`
  align-self: center;
  color: #999;
  font-size: 24px;
  font-weight: bold;
`

export const MatchContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`

export const MatchImage = styled.Image`
  height: 60px;
`

export const MatchAvatar = styled.Image`
  width: 160px;
  height: 160px;
  margin: 30px 0;
`

export const MatchName = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #fff;
`

export const MatchBio = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  text-align: center;
  padding: 0 30px;
`

export const MatchCloseButton = styled.TouchableOpacity``

export const MatchCloseButtonText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
`
