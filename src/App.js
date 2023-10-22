import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";
import { geoMercator } from "d3-geo";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [hoveredPrefecture, setHoveredPrefecture] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("./japan.geojson");
      if (response) {
        setData(response.data.features);
      }
    };
    loadData();
  }, []);

  const projection = geoMercator()
    .scale(600)
    .center([138, 38])
    .translate([560 / 2, 400 / 2]);

  return (
    <>
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "#F5F5F5" }}
        >
          <ComposableMap projection={projection}>
            <Geographies geography={data}>
              {({ geographies }) =>
                geographies.map((geo, i) => (
                  <Geography
                    key={geo.rsmKey || i}
                    geography={geo}
                    fill={
                      selectedPrefecture === geo.rsmKey
                        ? "#FFD700"
                        : hoveredPrefecture === geo.rsmKey
                        ? "#ADD8E6"
                        : "#EAEAEC"
                    }
                    stroke="#D6D6DA"
                    strokeWidth={1}
                    onClick={() => setSelectedPrefecture(geo.rsmKey)}
                    onMouseEnter={() => setHoveredPrefecture(geo.rsmKey)}
                    onMouseLeave={() => setHoveredPrefecture(null)}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </Box>
      </Container>
    </>
  );
};

export default App;
