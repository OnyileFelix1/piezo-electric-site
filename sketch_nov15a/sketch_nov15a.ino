const int pirPin = 2; // PIR sensor connected to digital pin 2

void setup() {
  Serial.begin(9600); // Initialize serial communication
  pinMode(pirPin, INPUT); // Set PIR pin as input

void loop() {
  int motion = digitalRead(pirPin); // Read PIR sensor data

  if (motion == HIGH) {
    Serial.println("Motion detected!");
    // You can add additional actions here, such as turning on an LED
  }

  delay(1000); // Delay to avoid rapid serial print
}
