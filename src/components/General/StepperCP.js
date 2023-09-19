import React from 'react';
import {Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import tw from '../../styles/twrnc.global';

export default function StepperCP({
  color = '#4b6ef3',
  currentStrokeWidth = 3,
  separatorStrokeWidth = 2,
  currentStepIndicatorSize = 35,
  stepIndicatorSize = 30,
  currentPage = 0,
  onStepPress = () => {},
  listLabels = [],
  stepCount = 0,
  getStepIndicatorIconConfig = params => {},
  isIcon,
}) {
  const secondIndicatorStyles = {
    stepIndicatorSize: stepIndicatorSize,
    currentStepIndicatorSize: currentStepIndicatorSize,
    separatorStrokeWidth: separatorStrokeWidth,
    currentStepStrokeWidth: currentStrokeWidth,
    stepStrokeCurrentColor: color,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: color,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: color,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: color,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: color,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: color,
  };

  const renderStepIndicator = params => getStepIndicatorIconConfig(params);

  const renderLabel = ({position, label, currentPosition}) => {
    return (
      <Text
        style={tw.style(
          'text-[12px] text-center font-medium',
          position === currentPosition ? `text-[${color}]` : 'text-[#999999]',
        )}>
        {label}
      </Text>
    );
  };
  return (
    <>
      <StepIndicator
        customStyles={secondIndicatorStyles}
        currentPosition={currentPage}
        onPress={onStepPress}
        stepCount={stepCount}
        renderStepIndicator={isIcon ? renderStepIndicator : renderLabel}
        labels={listLabels}
      />
    </>
  );
}
