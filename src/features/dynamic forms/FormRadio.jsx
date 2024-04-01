import React, { useState } from 'react';
import { Radio, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

export default function FormRadio() {
  const [options, setOptions] = useState(['Option 1', 'Option 2']);

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full bg-white p-4'>
      <Radio.Group>
        {options.map((option, index) => (
          <div
            key={index}
            className='flex items-center'
          >
            <Radio value={option}>{option}</Radio>
            {index > 1 && (
              <MinusCircleOutlined
                className='text-red-500 ml-4 cursor-pointer'
                onClick={() => removeOption(index)}
              />
            )}
          </div>
        ))}
        <Button
          type='link'
          onClick={addOption}
          icon={<PlusOutlined />}
        >
          Add Option
        </Button>
      </Radio.Group>
    </div>
  );
}
