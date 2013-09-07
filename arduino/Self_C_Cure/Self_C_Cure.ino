// Includes
#include <Arduino.h>
#include <Streaming.h>
#include <SoftwareSerial.h>
#include <WiFlySerial.h>
#include <PString.h>

#include "Credentials.h"
#include "Device_Constants.h"
#include "MemoryFree.h"

// Precompiler definitions
#define RX_PIN 2
#define TX_PIN 3
#define DEBUG_ON 1
#define REQUEST_BUFFER_SIZE 80
#define HEADER_BUFFER_SIZE 120
#define BODY_BUFFER_SIZE 180

// Statics
WiFlySerial WiFly(RX_PIN, TX_PIN);
char requestBuffer[REQUEST_BUFFER_SIZE];
char headerBuffer[HEADER_BUFFER_SIZE];
char bodyBuffer[BODY_BUFFER_SIZE];

void freeRequestStrings(char* queryString, char* header, char* body) {
  free(queryString);
  free(header);
  free(body);
  queryString = NULL;
  header = NULL;
  body = NULL;  
}

PString buildOpenRequest(char* requestPtr) {
  PString requestStr(requestPtr, REQUEST_BUFFER_SIZE);
  requestStr << "GET " << deviceId << openEndpoint
    << " HTTP/1.1" << "\n"
    << "\n\n";
}

PString buildCloseRequest(char* requestPtr) {
  PString requestStr(requestPtr, REQUEST_BUFFER_SIZE);
  requestStr << "GET " << deviceId << closeEndpoint
    << " HTTP/1.1" << "\n"
    << "\n\n";
}

int sendRequest(PString (*buildRequest)(char*)) {
   #if DEBUG_ON
  int freeMemoryStart = freeMemory();
  #endif
  
  // Allocate memory for request strings
  char* request = (char*) malloc(REQUEST_BUFFER_SIZE);
  char* header = (char*) malloc(HEADER_BUFFER_SIZE);
  char* body = (char*) malloc(BODY_BUFFER_SIZE);
  
  // Always null check after mallocs in case of heap overflow
  if (request == NULL || header == NULL || body == NULL) {
    Serial << "Heap Overflow Error" << endl;
    freeRequestStrings(request, header, body);
    
    // Return 0 to express failed request
    return 0;
  }
  
  // Load request strings into memory
  buildRequest(request);
  
  Serial << "Attempting to connect to server at " << serverIp << endl;
  
  WiFly.setRemotePort(serverPort);
  
  if (WiFly.openConnection(serverIp)) {
    Serial << "Connected to server at " << serverIp<< endl
           << "Sending GET: " << request << endl;
    
    WiFly << request;
    
    while (WiFly.isConnectionOpen()) {
      Serial << WiFly.read();
    }
    
    WiFly.closeConnection();
  } else {
    Serial << "Failed to connect to server at " << serverIp << endl;
  }
  
  
  // Free allocated memory
  freeRequestStrings(request, header, body);
  
  #if DEBUG_ON
  int freeMemoryFinish = freeMemory();
  if (freeMemoryStart != freeMemoryFinish) {
    Serial << "Memory leak detected:" << endl
           << "Free memory before:" << freeMemoryStart << endl
           << "Free memory after:" << freeMemoryFinish << endl;
  }
  #endif 
  
  // Return 1 to express successful request
  return 1;
}

void setup() {
  // Begin processes
  Serial.begin(9600);
  Serial << "Beginning WiFly" << endl;
  WiFly.begin();
  
  #if DEBUG_ON
  Serial << "Debug on" << endl;
  WiFly.setDebugChannel( (Print*) &Serial);
  #endif
  
  // Should be configured through wired network config interface
  WiFly.setAuthMode(WIFLY_AUTH_WPA2_PSK);
  WiFly.setDHCPMode(WIFLY_DHCP_ON);
  WiFly.setJoinMode(WIFLY_JOIN_AUTO);
  WiFly.setSSID(ssid);
  WiFly.setPassphrase(passphrase);
  
  Serial << "Attempting to join " << ssid << endl;
  if (WiFly.join()) {
    Serial << "Connected to " << ssid << endl;
  } else {
    Serial << "Failed to connect to " << ssid << endl;
    
    // Halt execution
    while (1) {}
  }
  
  Serial << "Waiting for network configuration..." << endl;
  delay (3000);
  
  Serial << "IP Address " << WiFly.getIP(requestBuffer, REQUEST_BUFFER_SIZE) << endl;
}

void loop() {
  sendRequest(buildOpenRequest);
  
  delay(5000);
}
