package org.example.conferenceservice.config;

import org.axonframework.extensions.kafka.KafkaProperties;
import org.axonframework.messaging.Message;
import org.axonframework.serialization.Serializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class AxonConfiguration {

    @Bean
    public KafkaProperties kafkaProperties() {
        KafkaProperties properties = new KafkaProperties();
        properties.setBootstrapServers(List.of("localhost:9092"));
        return properties;
    }
}

