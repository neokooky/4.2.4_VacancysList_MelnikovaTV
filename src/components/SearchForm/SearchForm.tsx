import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setSearchValue, setPage } from "../../store/vacanciesSlice";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const onSearch = (value: string) => {
    dispatch(setSearchValue(value));

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set("query", value);

      return newParams;
    });

    dispatch(setPage(1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <Group component="form" onSubmit={handleSubmit} align="flex-end">
      <TextInput
        ref={inputRef}
        w={403}
        styles={{ input: { height: 40 } }}
        placeholder="Должность или название компании"
        leftSection={<IconSearch size={16} />}
      />
      <Button variant="filled" color="#4263eb" h={40} type="submit">
        Найти
      </Button>
    </Group>
  );
};
