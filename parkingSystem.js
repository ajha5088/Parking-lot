class ParkingSystem{
    constructor(totalSlots){
        this.totalSlots = totalSlots;
        this.availableSlot = totalSlots;
        this.hourlyRate = 10;
        this.slot = new Array(totalSlots).fill (null).map((_, index) => ({
            id : index+1,
            occupied:false,
            start_time : null,
            end_time : null,
            phone_number : null,
        }))
    }

    async availableSlot(){
        try {
            return this.availableSlot;
        } catch (error) {
            console.log(error)
        }
    }

    async parkVehicle(phone_number){
        try {
            if(this.availableSlot>0){
                const emptySlot = this.slot.find((slot) => !slot.occupied )
                emptySlot.occupied = true;
                emptySlot.start_time = new Date()
                this.availableSlot--;

                emptySlot.phone_number = phone_number;
                console.log(this.availableSlot , `Car is parked at ${emptySlot.id}`)
            }else{
                console.log("No available slots")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async exitVehicle(slot_id){
        try {
            const slotToBeRemoved = this.slot.find((slot) => slot.id === slot_id) 
            if(slotToBeRemoved && slotToBeRemoved.occupied){
                console.log("")
                const endTime = new Date();
                const cost = this.hourlyRate * (endTime-slotToBeRemoved.start_time);
                console.log("Car is leaving the parking")
                slotToBeRemoved.occupied = false
                slotToBeRemoved.start_time = 0
                this.availableSlot++;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async locateCar(phone_number){
        try {
            const findSlot = this.slot.find((slot) => slot.phone_number === phone_number )
            if(findSlot){
                return findSlot.id;
            }else{
                return {message : "Car not found"}
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default ParkingSystem;
