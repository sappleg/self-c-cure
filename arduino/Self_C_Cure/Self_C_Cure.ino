// Includes
#include <Arduino.h>
#include <Streaming.h>
#include <SoftwareSerial.h>
#include <WiFlySerial.h>
#include "Credentials.h"

// Precompiler definitions
#define RX_PIN 2
#define TX_PIN 3
#define REQUEST_BUFFER_SIZE 80
#define HEADER_BUFFER_SIZE 120
#define BODY_BUFFER_SIZE 180

// Statics
WiFlySerial WiFly(RX_PIN, TX_PIN);
char requestBuffer[REQUEST_BUFFER_SIZE];
char headerBuffer[HEADER_BUFFER_SIZE];
char bodyBuffer[BODY_BUFFER_SIZE];

// Arduino setup
void setup() {
  // begin processes
  Serial.begin(9600);
  WiFly.begin();
  WiFly.setDebugChannel( (Print*) &Serial);
  
  // should be configured through wired network config interface
  WiFly.setAuthMode(WIFLY_AUTH_WPA2_PSK);
  WiFly.setDHCPMode(WIFLY_DHCP_ON);
  WiFly.setJoinMode(WIFLY_JOIN_AUTO);
  WiFly.setSSID(ssid);
  WiFly.setPassphrase(passphrase);
  
  if (WiFly.join()) {
    Serial << "Connected to " << ssid << endl;
  } else {
    Serial << "Failed to connect to " << ssid << endl;
  }
  
  Serial << "Waiting for network configuration..." << endl;
  delay (10000);
  
  Serial << "IP Address " << WiFly.getIP(requestBuffer, REQUEST_BUFFER_SIZE) << endl;
}

void loop() {
  char* header = (char*) malloc(HEADER_BUFFER_SIZE);
  char* body = (char*) malloc(BODY_BUFFER_SIZE);
  
  if (header == NULL || body == NULL) {
    Serial << "Heap Overflow Error";
    return;
  }
  
  PString headerStr(header, HEADER_BUFFER_SIZE);
  PString bodyStr(body, BODY_BUFFER_SIZE);
  
  free(header)
  free(body)
  header = NULL;
  body = NULL;
  
  delay(5000);
}
