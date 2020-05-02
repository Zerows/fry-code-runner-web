class Publisher
  def self.publish(msg, queue)
    q = channel.queue(queue, {:auto_delete => false, durable: true, exclusive: false})
    q.publish(JSON.generate(msg), :routing_key => q.name)
  end

  def self.channel
    @channel ||= connection.create_channel
  end

  def self.connection
    @connection ||= Bunny.new(:host => ENV["QUEUE_HOST"] || "rabbitmq").tap do |c|
      c.start
    end
  end
end