import {
  Box,
  // Button,
  // Group,
  NativeSelect,
  // Pill,
  Stack,
  // TextInput,
} from "@mantine/core";
import styles from "./Filters.module.css";
// import icon from "../../images/add_icon.svg";
import { IconMapPin } from "@tabler/icons-react";
// import { useState } from "react";

type FiltersProps = {
  skills: Array<string>;
  setSkills: (skill: Array<string>) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
};

export const Filters = ({
  // skills,
  // setSkills,
  selectedCity,
  setSelectedCity,
}: FiltersProps) => {
  // const [value, setValue] = useState("");

  // const addSkill = () => {
  //   if (value.trim() !== "" && !skills.includes(value.trim())) {
  //     setSkills([...skills, value.trim()]);
  //     setValue("");
  //   }
  // };

  // const removeSkill = (skill: string) => {
  //   setSkills(skills.filter((s) => s !== skill));
  // };

  return (
    <>
      <Stack gap="xs">
        {/* <Box className={styles.filter}>
          <Group align="flex-end" mb="xs">
            <TextInput
              w={215}
              label="Ключевые навыки"
              placeholder="Навык"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button p={0} opacity={0.5} onClick={addSkill}>
              <img src={icon} alt="add" />
            </Button>
          </Group>
          <Pill.Group>
            {skills.map((skill) => (
              <Pill
                key={skill}
                withRemoveButton
                onRemove={() => removeSkill(skill)}
              >
                {skill}
              </Pill>
            ))}
          </Pill.Group>
        </Box> */}
        <Box className={styles.filter}>
          <NativeSelect
            w={269}
            data-testid="city-select"
            leftSection={<IconMapPin size={16} />}
            description="Город"
            data={[
              { value: "", label: "Все" },
              { value: "1", label: "Москва" },
              { value: "2", label: "Санкт-Петербург" },
            ]}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.currentTarget.value)}
          />
        </Box>
      </Stack>
    </>
  );
};
