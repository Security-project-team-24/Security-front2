import React, { useEffect } from 'react';
import { useApplicationStore } from '../../store/application.store';
import { useGetEngineerSkills } from '../../api/services/user/useGetEngineerSkills';
import { Button, Flex, Input } from '@chakra-ui/react';
import { Skill } from '../../api/services/user/types/skill';
import { BsTrash } from 'react-icons/bs';
import { useDeleteSkill } from '../../api/services/user/useDeleteSkill';

export const SkillsPage = () => {
  const { skillsRes, getEngineerSkills } = useGetEngineerSkills();
  const { deleteSkillRes, deleteSkill } = useDeleteSkill();
  const user = useApplicationStore((state) => state.user);

  useEffect(() => {
    init();
  }, [skillsRes.data?.length]);

  const init = async () => {
    await getEngineerSkills(user?.engineer?.id ?? -1);
  };

  const handleRemoveSkill = async (skill: Skill) => {
    await deleteSkill(skill);
    await getEngineerSkills(user?.engineer?.id ?? -1);
  };

  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      padding={'20px 0'}
      gap={'10px'}
    >
      {skillsRes?.data?.map((skill: Skill) => (
        <Flex key={skill.skill}>
          <Input defaultValue={skill.skill} />
          <Input type='number' defaultValue={skill.strength} width={'50px'} />
          <Button onClick={() => handleRemoveSkill(skill)} marginLeft={'10px'}>
            <BsTrash fontSize={'25'} color='red'></BsTrash>
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};
