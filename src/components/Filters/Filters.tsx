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
import { memo, useEffect, useState } from "react";
import {
  setSelectedCity,
  setSkills,
  setPage,
  setFiltersInitialized,
} from "../../store/vacanciesSlice";
import type { RootState } from "../../store/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { cityOptions, RegionValue } from "../../constants";

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

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (selectedCity !== RegionValue.All) {
        const label = cityOptions.find(
          (opt) => opt.value === selectedCity
        )?.label;
        if (label) params.set("city", label);
      } else {
        params.delete("city");
      }

      params.delete("skill");
      skills.forEach((skill) => params.append("skill", skill));

      return params;
    });
  }, [skills, selectedCity, setSearchParams]);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    console.log("сейчас параметр сити в юрл:", cityParam?.toString());
    const matchedOption = cityOptions.find(
      (option) => option.label === cityParam
    );
    const cityValue = matchedOption?.value || RegionValue.All;
    console.log("значит город для отображения: ", cityValue);
    dispatch(setSelectedCity(cityValue));

    const skillsParam = searchParams.getAll("skill");
    dispatch(setSkills(skillsParam));

    dispatch(setFiltersInitialized());
  }, [dispatch, searchParams]);

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

  const handleChange = (e) => {
    dispatch(setSelectedCity(e.currentTarget.value));
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
            data={cityOptions}
            value={selectedCity}
            onChange={handleChange}
          />
        </Box>
      </Stack>
    </>
  );
};

export default memo(Filters);
