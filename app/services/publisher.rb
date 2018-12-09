class Publisher
  def self.publish(msg)
    q = channel.queue("rpc_queue",{:auto_delete => false, durable: true, exclusive: false})
    q.publish(JSON.generate(msg), :routing_key => q.name)
  end

  def self.channel
    @channel ||= connection.create_channel
  end

  def self.connection
    @connection ||= Bunny.new(:host => "rabbitmq").tap do |c|
      c.start
    end
  end
end