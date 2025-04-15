import { SimpleGrid, Box, Heading, Text, Button, Icon, VStack, useColorModeValue } from "@chakra-ui/react"
import { FiMail, FiMessageSquare, FiPhone } from "react-icons/fi"
import { Link as RouterLink } from "react-router-dom"

const ContactOptions = () => {
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const options = [
    {
      title: "Envíanos un email",
      description: "Responderemos a tu consulta en un plazo de 24 horas.",
      icon: FiMail,
      action: "Enviar email",
      link: "/contact",
    },
    {
      title: "Chat en vivo",
      description: "Habla con un agente de soporte en tiempo real.",
      icon: FiMessageSquare,
      action: "Iniciar chat",
      link: "#",
    },
    {
      title: "Llámanos",
      description: "Disponible de lunes a viernes de 9:00 a 18:00.",
      icon: FiPhone,
      action: "Ver teléfonos",
      link: "/contact",
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      {options.map((option, index) => (
        <Box
          key={index}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={borderColor}
          bg={bgColor}
          textAlign="center"
        >
          <VStack spacing={4}>
            <Icon as={option.icon} boxSize={10} color="blue.500" />
            <Heading size="md">{option.title}</Heading>
            <Text>{option.description}</Text>
            <Button as={RouterLink} to={option.link} colorScheme="blue" width="full">
              {option.action}
            </Button>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ContactOptions
