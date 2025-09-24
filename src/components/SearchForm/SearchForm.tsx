import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
// import type { RootState } from "../../store/store";
import { setSearchValue, setPage } from "../../store/vacanciesSlice";
import { useRef } from "react";

// type SearchFormProps = {
//   setIsSearchTriggered: (trigger: boolean) => void;
// };

export const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const onSearch = (value: string | undefined) => {
    dispatch(setSearchValue(value));
    dispatch(setPage(1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputRef.current?.value);
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
      <Button
        variant="filled"
        color="#4263eb"
        h={40}
        onClick={() => {
          onSearch(inputRef.current?.value);
        }}
      >
        Найти
      </Button>
    </Group>
  );
};
