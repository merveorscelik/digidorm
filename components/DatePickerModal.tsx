import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import DatePicker from "react-native-modern-datepicker";
import { Calendar, LocaleConfig } from 'react-native-calendars';

const moment = require('moment')

export type SelectedDateType = "booked" | "selected"
export interface SelectedDate {
    selectionType: SelectedDateType
    date: string
}


interface DatePickerModalProps {
    open?: boolean;
    startDate: string;
    selectedDate: string;
    selectedDates: SelectedDate[]
    onClose: () => void;
    onChangeStartDate: (date: string) => void;
}


const error = console.error;

console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
}



const DatePickerModal: FC<DatePickerModalProps> = ({
    open = false,
    startDate,
    selectedDate,
    selectedDates,
    onClose,
    onChangeStartDate,
}) => {
    const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);
    const [formattedMarkedDates, setFormattedMarkedDates] = useState({})

    useEffect(() => {
        const selected = {}
        if(selectedDates) {

            selectedDates.forEach(d => {
                selected[moment(d.date).format("YYYY-MM-DD") as String] = { 
                    marked: d.selectionType == 'booked', 
                    disabled: d.selectionType == 'booked', 
                    selected: d.selectionType != 'booked'
                }
            })
        }

        console.log({selected})
        setFormattedMarkedDates(selected)

        console.log({selectedDates})

    }, [selectedDates])

    const handleDateChange = (date: string) => {
        setSelectedStartDate(date);
    };

    const handleOnPressStartDate = () => {
        onChangeStartDate(selectedStartDate);
        onClose();
    };

    const getSelectedDates = () => {
    }


    return (
        <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/*
                    <DatePicker
                        mode="calendar"
                        minimumDate={startDate}
                        selected={selectedStartDate}
                        onSelectedChange={handleDateChange}
                        options={{
                        }}
                    />
                    */}

                    <Calendar
                        onDayPress={day => onChangeStartDate(day)}
                        style={{
                            width: 350,
                            height: 360
                        }}
                        markedDates={formattedMarkedDates}
                        minDate={moment().format('YYYY-MM-DD')}
                        theme={{
                            backgroundColor: "#5f775d",
                            calendarBackground: "#5f775d",
                            textHeaderColor: "white",
                            dayTextColor: "white",
                            selectedDayBackgroundColor: "white",
                            selectedDayTextColor: "#5f775d",
                            mainColor: "white",
                            textSecondaryColor: "white",
                            borderColor: "#5f775d",
                            textDisabledColor: '#dd99ee'


                        }}
                    />
                    <TouchableOpacity onPress={handleOnPressStartDate} style={styles.button}>
                        <Text style={styles.buttonText}>Select Date and Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#BDBDBD",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 25,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginTop: 20,
        backgroundColor: '#5f775d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default DatePickerModal;
