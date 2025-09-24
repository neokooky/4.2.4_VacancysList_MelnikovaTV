import {
  Box,
  Button,
  Group,
  NativeSelect,
  Pill,
  Stack,
  TextInput,
} from "@mantine/core";
import styles from "./Filters.module.css";
import icon from "../../images/add_icon.svg";
import { IconMapPin } from "@tabler/icons-react";
import { memo, useState } from "react";
import {
  setSelectedCity,
  setSkills,
  setPage,
} from "../../store/vacanciesSlice";
import type { RootState } from "../../store/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

enum RegionValue {
  All = "",
  Moscow = "1",
  SaintPetersburg = "2",
}

// type FiltersProps = {
//   skills: Array<string>;
//   setSkills: (skill: Array<string>) => void;
//   selectedCity: string;
//   setSelectedCity: (city: string) => void;
// };

const Filters = () => {
  const [value, setValue] = useState("");

  const { skills, selectedCity } = useSelector(
    (state: RootState) => ({
      skills: state.vacancies.skills,
      selectedCity: state.vacancies.selectedCity,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const addSkill = () => {
    if (value.trim() !== "" && !skills.includes(value.trim())) {
      dispatch(setSkills([...skills, value.trim()]));
      dispatch(setPage(1));
      setValue("");
    }
  };

  const removeSkill = (skill: string) => {
    dispatch(setSkills(skills.filter((s) => s !== skill)));
  };

  return (
    <>
      <Stack gap="xs">
        <Box className={styles.filter}>
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
        </Box>
        <Box className={styles.filter}>
          <NativeSelect
            w={269}
            data-testid="city-select"
            leftSection={<IconMapPin size={16} />}
            description="Город"
            data={[
              { value: RegionValue.All, label: "Все" },
              { value: RegionValue.Moscow, label: "Москва" },
              {
                value: RegionValue.SaintPetersburg,
                label: "Санкт-Петербург",
              },
            ]}
            value={selectedCity}
            onChange={(e) => dispatch(setSelectedCity(e.currentTarget.value))}
          />
        </Box>
      </Stack>
    </>
  );
};

export default memo(Filters);
