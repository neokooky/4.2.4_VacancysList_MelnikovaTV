import { Box, Button, Group, Pill, Stack, TextInput } from "@mantine/core";
import styles from "./Filters.module.css";
import icon from "../../images/add_icon.svg";
import { memo, useEffect, useState } from "react";
import {
  setSkills,
  setPage,
  setFiltersInitialized,
} from "../../store/vacanciesSlice";
import type { RootState } from "../../store/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const [value, setValue] = useState("");

  const { skills } = useSelector(
    (state: RootState) => ({
      skills: state.vacancies.skills,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("skill");
      skills.forEach((skill) => params.append("skill", skill));

      return params;
    });
  }, [skills, setSearchParams]);

  useEffect(() => {
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
        {/* <Box className={styles.filter}>
          <NativeSelect
            w={269}
            data-testid="city-select"
            leftSection={<IconMapPin size={16} />}
            description="Город"
            data={cityOptions}
            value={selectedCity}
            onChange={handleChange}
          />
        </Box> */}
      </Stack>
    </>
  );
};

export default memo(Filters);
