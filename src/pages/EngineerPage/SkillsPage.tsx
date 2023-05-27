import React, { useEffect, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import { useGetEngineerSkills } from '../../api/services/user/useGetEngineerSkills';
import { Button, Flex, Input } from '@chakra-ui/react';
import { Skill } from '../../api/services/user/types/skill';
import { BsTrash } from 'react-icons/bs';
import { useDeleteSkill } from '../../api/services/user/useDeleteSkill';
import { useUpdateSkill } from '../../api/services/user/useUpdateSkill';

export const SkillsPage = () => {
  const { skillsRes, getEngineerSkills } = useGetEngineerSkills();
  const { deleteSkillRes, deleteSkill } = useDeleteSkill();
  const { updateSkillRes, updateSkill } = useUpdateSkill();
  const user = useApplicationStore((state) => state.user);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await getEngineerSkills(user?.engineer?.id ?? -1);
  };

  const handleRemoveSkill = async (skill: Skill) => {
    await deleteSkill(skill);
    await getEngineerSkills(user?.engineer?.id ?? -1);
  };

  const handleUpdateSkill = async (skill: Skill) => {
    await updateSkill(skill);
  };

  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      padding={'20px 0'}
      gap={'10px'}
    >
      {skillsRes?.data?.map((skill: Skill) => (
        <Flex key={skill.skill} gap={'10px'}>
          <Input defaultValue={skill.skill} disabled={true} />
          <Input
            type='number'
            defaultValue={skill.strength}
            onChange={(e) => (skill.strength = parseInt(e.target.value))}
            width={'50px'}
            min={1}
            max={5}
          />
          <Button onClick={() => handleRemoveSkill(skill)} marginLeft={'10px'}>
            <BsTrash fontSize={'25'} color='red'></BsTrash>
          </Button>
          <Button onClick={() => handleUpdateSkill(skill)}>Update</Button>
        </Flex>
      ))}
    </Flex>
  );
};
