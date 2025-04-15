"use client"
import {
  Box,
  Text,
  Flex,
  Heading,
  Button,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Checkbox,
  Stack,
} from "@chakra-ui/react"

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedSubcategories,
  handleSubcategoryChange,
  subcategories,
  resetFilters,
}) => {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Filtros</Heading>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Limpiar filtros
        </Button>
      </Flex>

      <Box mb={6}>
        <Text fontWeight="bold" mb={2}>
          Precio
        </Text>
        <Flex justify="space-between" mb={2}>
          <Text>${priceRange[0].toLocaleString()}</Text>
          <Text>${priceRange[1].toLocaleString()}</Text>
        </Flex>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[0, 50000]}
          min={0}
          max={50000}
          step={1000}
          value={priceRange}
          onChange={setPriceRange}
          colorScheme="blue"
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Box>

      {subcategories.length > 0 && (
        <Box mb={6}>
          <Text fontWeight="bold" mb={2}>
            Subcategorías
          </Text>
          <Stack spacing={2}>
            {subcategories.map((subcat) => (
              <Checkbox
                key={subcat}
                isChecked={selectedSubcategories.includes(subcat)}
                onChange={() => handleSubcategoryChange(subcat)}
                colorScheme="blue"
              >
                {subcat}
              </Checkbox>
            ))}
          </Stack>
        </Box>
      )}

      <Box mb={6}>
        <Text fontWeight="bold" mb={2}>
          Envío
        </Text>
        <Checkbox colorScheme="blue">Envío gratis</Checkbox>
      </Box>

      <Box mb={6}>
        <Text fontWeight="bold" mb={2}>
          Condición
        </Text>
        <Stack spacing={2}>
          <Checkbox colorScheme="blue">Nuevo</Checkbox>
          <Checkbox colorScheme="blue">Usado</Checkbox>
          <Checkbox colorScheme="blue">Reacondicionado</Checkbox>
        </Stack>
      </Box>

      <Box mb={6}>
        <Text fontWeight="bold" mb={2}>
          Calificación
        </Text>
        <Stack spacing={2}>
          <Checkbox colorScheme="blue">4 estrellas o más</Checkbox>
          <Checkbox colorScheme="blue">3 estrellas o más</Checkbox>
          <Checkbox colorScheme="blue">2 estrellas o más</Checkbox>
        </Stack>
      </Box>
    </Box>
  )
}

export default FilterSidebar
